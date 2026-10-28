use serde::{Deserialize, Serialize};
use std::{
    collections::HashSet,
    path::PathBuf,
    sync::{Arc, Mutex, MutexGuard},
    time::{Duration, Instant, SystemTime, UNIX_EPOCH},
};
use sysinfo::{Disks, ProcessesToUpdate, System};
use tauri::{
    AppHandle, Emitter, Manager, RunEvent, State, WindowEvent,
    menu::{Menu, MenuItem},
    tray::{MouseButton, MouseButtonState, TrayIcon, TrayIconBuilder, TrayIconEvent},
    window::{Effect, EffectsBuilder},
};
use tauri_plugin_updater::UpdaterExt;
use zanrei_core::{
    Error, autostart, cleanup, games,
    games::{Game, GameOption, GameOptions},
    platform::{self, Platform},
    power,
    restore::{Snapshot, Store},
    settings::{self, Mode, Settings},
    system::{self, SystemInfo},
    tweaks::{self, Restart, Risk, TweakInfo},
};

type CoreResult<T> = zanrei_core::Result<T>;
type Res<T> = Result<T, String>;

const SESSION_MAX_AGE_SECS: u64 = 24 * 60 * 60;
const BOOST_EVENT: &str = "zanrei://boost";
const UPDATE_EVENT: &str = "zanrei://update";
const UPDATE_CHECK_EVERY: Duration = Duration::from_secs(6 * 60 * 60);

struct Inner {
    platform: Box<dyn Platform>,
    store: Store,
    dir: PathBuf,
    /// Mica only exists on Windows 11; on 10 the UI falls back to a solid background.
    mica: bool,
    /// Serialises everything that changes the system, so journal files are never written concurrently.
    change_lock: Mutex<()>,
    settings: Mutex<Settings>,
    /// The snapshot every change of this session goes into: (id, created_unix).
    session: Mutex<Option<(String, u64)>>,
    pending_restart: Mutex<Restart>,
    system: Mutex<Option<SystemInfo>>,
    games: Mutex<Vec<Game>>,
    boost: Mutex<BoostStatus>,
    tray: Mutex<Option<TrayIcon>>,
    update: Mutex<UpdateStatus>,
    /// The release found by the last check; installing needs the exact object.
    pending_update: Mutex<Option<tauri_plugin_updater::Update>>,
}

#[derive(Clone)]
struct AppState(Arc<Inner>);

fn lock<T>(m: &Mutex<T>) -> MutexGuard<'_, T> {
    m.lock().unwrap_or_else(|e| e.into_inner())
}

fn now_unix() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs()
}

impl Inner {
    fn detect(&self) -> SystemInfo {
        let info = system::detect(&*self.platform);
        *lock(&self.system) = Some(info.clone());
        info
    }

    fn system(&self) -> SystemInfo {
        let cached = lock(&self.system).clone();
        cached.unwrap_or_else(|| self.detect())
    }

    /// Creating the restore point is what makes a change allowed; if it fails, nothing may change.
    fn ensure_session(&self) -> CoreResult<String> {
        let mut session = lock(&self.session);
        if let Some((id, at)) = session.as_ref()
            && now_unix().saturating_sub(*at) < SESSION_MAX_AGE_SECS
        {
            return Ok(id.clone());
        }
        let snap = self.store.create(&*self.platform, "Zanrei")?;
        *session = Some((snap.id.clone(), snap.created_unix));
        Ok(snap.id)
    }

    fn update_settings(&self, f: impl FnOnce(&mut Settings)) -> CoreResult<Settings> {
        let mut s = lock(&self.settings);
        f(&mut s);
        settings::save(&self.dir, &s)?;
        Ok(s.clone())
    }

    fn note_restart(&self, kind: Restart) {
        let mut p = lock(&self.pending_restart);
        *p = (*p).max(kind);
    }

    fn list_tweaks(&self) -> Vec<TweakInfo> {
        let (build, tier) = (system::os_build(), self.system().tier);
        // Each state check reads the registry or asks Windows; run them side by side.
        std::thread::scope(|scope| {
            let handles: Vec<_> = tweaks::catalog()
                .iter()
                .map(|t| scope.spawn(move || tweaks::info(&*self.platform, t, build, tier)))
                .collect();
            handles.into_iter().filter_map(|h| h.join().ok()).collect()
        })
    }

    fn set_tweak(&self, id: &str, enabled: bool) -> CoreResult<TweakInfo> {
        let t = tweaks::find(id).ok_or_else(|| Error::Msg("unknown tweak".into()))?;
        let (build, tier) = (system::os_build(), self.system().tier);
        {
            let _guard = lock(&self.change_lock);
            if enabled {
                let sid = self.ensure_session()?;
                tweaks::apply(&self.store, &*self.platform, &sid, t, build)?;
            } else {
                tweaks::revert(&*self.platform, t)?;
            }
        }
        self.note_restart(t.restart);
        self.update_settings(|s| {
            s.user_disabled.retain(|x| x != id);
            if !enabled {
                s.user_disabled.push(id.to_string());
            }
        })?;
        Ok(tweaks::info(&*self.platform, t, build, tier))
    }

    /// Applies the tweaks that suit this PC, skipping anything the user switched off by hand.
    fn apply_recommended(&self, include_moderate: bool) -> ApplyReport {
        let (build, tier) = (system::os_build(), self.system().tier);
        let disabled = lock(&self.settings).user_disabled.clone();
        let mut report = ApplyReport::default();
        for t in tweaks::catalog() {
            let allowed = t.risk == Risk::Safe || (include_moderate && t.risk == Risk::Moderate);
            if !allowed || !t.recommended.contains(&tier) || disabled.iter().any(|d| d == t.id) {
                continue;
            }
            if matches!(
                tweaks::state(&*self.platform, t, build),
                tweaks::State::Applied | tweaks::State::Unavailable
            ) {
                continue;
            }
            // set_tweak records "switched off by hand" only for enabled=false, so this stays clean.
            match self.set_tweak(t.id, true) {
                Ok(_) => report.applied.push(t.id.to_string()),
                Err(e) => report.failed.push(Failure {
                    id: t.id.to_string(),
                    error: e.to_string(),
                }),
            }
        }
        report
    }

    fn refresh_games(&self) -> Vec<Game> {
        let roots: Vec<PathBuf> = Disks::new_with_refreshed_list()
            .iter()
            .map(|d| d.mount_point().to_path_buf())
            .collect();
        let custom = lock(&self.settings).custom_games.clone();
        let found = games::detect(&*self.platform, &roots, &custom);
        *lock(&self.games) = found.clone();
        found
    }
}

#[derive(Serialize, Default)]
struct ApplyReport {
    applied: Vec<String>,
    failed: Vec<Failure>,
}

#[derive(Serialize)]
struct Failure {
    id: String,
    error: String,
}

#[derive(Serialize)]
struct GameInfo {
    #[serde(flatten)]
    game: Game,
    options: GameOptions,
}

#[derive(Serialize, Clone, Default)]
struct BoostStatus {
    active: bool,
    game: Option<String>,
}

#[derive(Serialize, Clone, Default)]
struct UpdateInfo {
    version: String,
    notes: Option<String>,
    date: Option<String>,
}

#[derive(Serialize, Clone, Default)]
struct UpdateStatus {
    current: String,
    available: Option<UpdateInfo>,
    checking: bool,
    installing: bool,
    downloaded: u64,
    total: Option<u64>,
    error: Option<String>,
    last_checked_unix: Option<u64>,
}

/// The part of the settings the UI owns. Backend-owned fields (disabled tweaks, boost state, custom games)
/// are never overwritten from here.
#[derive(Deserialize)]
struct Preferences {
    language: Option<String>,
    setup_done: bool,
    mode: Mode,
    run_in_background: bool,
    game_boost: bool,
    auto_update: bool,
}

async fn with<T: Send + 'static>(
    state: &State<'_, AppState>,
    f: impl FnOnce(&Inner) -> CoreResult<T> + Send + 'static,
) -> Res<T> {
    let s = state.inner().clone();
    tauri::async_runtime::spawn_blocking(move || f(&s.0))
        .await
        .map_err(|e| e.to_string())?
        .map_err(|e| e.to_string())
}

// ---- system and restore

#[tauri::command]
async fn detect_system(s: State<'_, AppState>) -> Res<SystemInfo> {
    with(&s, |i| Ok(i.detect())).await
}

#[tauri::command]
async fn list_snapshots(s: State<'_, AppState>) -> Res<Vec<Snapshot>> {
    with(&s, |i| Ok(i.store.list())).await
}

#[tauri::command]
async fn create_snapshot(s: State<'_, AppState>, label: String) -> Res<Snapshot> {
    with(&s, move |i| {
        let _guard = lock(&i.change_lock);
        i.store.create(&*i.platform, &label)
    })
    .await
}

#[tauri::command]
async fn rollback_snapshot(s: State<'_, AppState>, id: String) -> Res<()> {
    with(&s, move |i| {
        let _guard = lock(&i.change_lock);
        i.store.rollback(&*i.platform, &id)?;
        // Whatever was undone may need the same follow-up as when it was applied.
        i.note_restart(Restart::Reboot);
        Ok(())
    })
    .await
}

#[tauri::command]
async fn open_system_restore(s: State<'_, AppState>) -> Res<()> {
    with(&s, |i| i.platform.open_system_restore()).await
}

// ---- tweaks

#[tauri::command]
async fn list_tweaks(s: State<'_, AppState>) -> Res<Vec<TweakInfo>> {
    with(&s, |i| Ok(i.list_tweaks())).await
}

#[tauri::command]
async fn set_tweak(s: State<'_, AppState>, id: String, enabled: bool) -> Res<TweakInfo> {
    with(&s, move |i| i.set_tweak(&id, enabled)).await
}

#[tauri::command]
async fn apply_recommended(s: State<'_, AppState>, include_moderate: bool) -> Res<ApplyReport> {
    with(&s, move |i| Ok(i.apply_recommended(include_moderate))).await
}

#[tauri::command]
async fn clean_temp(s: State<'_, AppState>) -> Res<u64> {
    with(&s, |_| {
        let age = Duration::from_secs(3600);
        let win_temp = std::env::var_os("SystemRoot").map(|r| PathBuf::from(r).join("Temp"));
        Ok([Some(std::env::temp_dir()), win_temp]
            .into_iter()
            .flatten()
            .map(|d| cleanup::clean_dir(&d, age))
            .sum())
    })
    .await
}

// ---- restart

#[tauri::command]
fn pending_restart(s: State<'_, AppState>) -> Restart {
    *lock(&s.0.pending_restart)
}

#[tauri::command]
async fn restart_now(s: State<'_, AppState>, seconds: u32) -> Res<()> {
    with(&s, move |i| power::restart(&*i.platform, seconds)).await
}

#[tauri::command]
async fn cancel_restart(s: State<'_, AppState>) -> Res<()> {
    with(&s, |i| power::cancel_restart(&*i.platform)).await
}

#[tauri::command]
async fn restart_explorer(s: State<'_, AppState>) -> Res<()> {
    with(&s, |i| {
        power::restart_explorer(&*i.platform)?;
        let mut p = lock(&i.pending_restart);
        if *p == Restart::Explorer {
            *p = Restart::None;
        }
        Ok(())
    })
    .await
}

// ---- games

#[tauri::command]
async fn list_games(s: State<'_, AppState>) -> Res<Vec<GameInfo>> {
    with(&s, |i| {
        Ok(i.refresh_games()
            .into_iter()
            .map(|game| {
                let options = games::options(&*i.platform, &game.exe).unwrap_or_default();
                GameInfo { game, options }
            })
            .collect())
    })
    .await
}

#[tauri::command]
async fn set_game_option(s: State<'_, AppState>, exe: String, option: GameOption, enabled: bool) -> Res<GameOptions> {
    with(&s, move |i| {
        let _guard = lock(&i.change_lock);
        let sid = i.ensure_session()?;
        games::set_option(&i.store, &*i.platform, &sid, &exe, option, enabled)?;
        games::options(&*i.platform, &exe)
    })
    .await
}

#[tauri::command]
async fn add_custom_game(s: State<'_, AppState>, name: String, exe: String) -> Res<()> {
    with(&s, move |i| {
        i.update_settings(|st| {
            if !st.custom_games.iter().any(|g| g.exe.eq_ignore_ascii_case(&exe)) {
                st.custom_games.push(games::CustomGame { name, exe });
            }
        })
        .map(|_| ())
    })
    .await
}

#[tauri::command]
async fn remove_custom_game(s: State<'_, AppState>, exe: String) -> Res<()> {
    with(&s, move |i| {
        i.update_settings(|st| st.custom_games.retain(|g| !g.exe.eq_ignore_ascii_case(&exe)))
            .map(|_| ())
    })
    .await
}

#[tauri::command]
fn boost_status(s: State<'_, AppState>) -> BoostStatus {
    lock(&s.0.boost).clone()
}

// ---- settings and background

#[tauri::command]
fn get_settings(s: State<'_, AppState>) -> Settings {
    lock(&s.0.settings).clone()
}

#[tauri::command]
async fn save_preferences(app: AppHandle, s: State<'_, AppState>, prefs: Preferences) -> Res<()> {
    let old_lang = lock(&s.0.settings).language.clone();
    let new_lang = prefs.language.clone();
    with(&s, move |i| {
        i.update_settings(|st| {
            st.language = prefs.language;
            st.setup_done = prefs.setup_done;
            st.mode = prefs.mode;
            st.run_in_background = prefs.run_in_background;
            st.game_boost = prefs.game_boost;
            st.auto_update = prefs.auto_update;
        })
        .map(|_| ())
    })
    .await?;
    if old_lang != new_lang {
        refresh_tray_menu(&app, new_lang.as_deref().unwrap_or("en"));
    }
    Ok(())
}

#[tauri::command]
fn mica_enabled(s: State<'_, AppState>) -> bool {
    s.0.mica
}

#[tauri::command]
async fn get_autostart(s: State<'_, AppState>) -> Res<bool> {
    with(&s, |i| Ok(autostart::enabled(&*i.platform))).await
}

#[tauri::command]
async fn set_autostart(s: State<'_, AppState>, enabled: bool) -> Res<()> {
    with(&s, move |i| {
        let exe = std::env::current_exe()?;
        autostart::set(&*i.platform, &exe.to_string_lossy(), enabled)
    })
    .await
}

#[tauri::command]
fn send_to_background(app: AppHandle, s: State<'_, AppState>) {
    if let Some(w) = app.get_webview_window("main") {
        // Without the tray there is nothing to bring a hidden window back, so only hide when background mode is on.
        let _ = if lock(&s.0.settings).run_in_background {
            w.hide()
        } else {
            w.minimize()
        };
    }
}

#[tauri::command]
fn quit_app(app: AppHandle) {
    app.exit(0);
}

// ---- window, tray

fn show_main(app: &AppHandle) {
    if let Some(w) = app.get_webview_window("main") {
        let _ = w.show();
        let _ = w.unminimize();
        let _ = w.set_focus();
    }
}

/// (open, exit) in the UI language.
fn tray_labels(lang: &str) -> (&'static str, &'static str) {
    match lang {
        "tr" => ("Zanrei'yi aç", "Çık"),
        "es" => ("Abrir Zanrei", "Salir"),
        "de" => ("Zanrei öffnen", "Beenden"),
        "fr" => ("Ouvrir Zanrei", "Quitter"),
        "pt" => ("Abrir o Zanrei", "Sair"),
        "ru" => ("Открыть Zanrei", "Выход"),
        "zh" => ("打开 Zanrei", "退出"),
        "ja" => ("Zanreiを開く", "終了"),
        "ar" => ("فتح Zanrei", "خروج"),
        _ => ("Open Zanrei", "Exit"),
    }
}

fn tray_menu(app: &AppHandle, lang: &str) -> tauri::Result<Menu<tauri::Wry>> {
    let (open, exit) = tray_labels(lang);
    Menu::with_items(
        app,
        &[
            &MenuItem::with_id(app, "open", open, true, None::<&str>)?,
            &MenuItem::with_id(app, "quit", exit, true, None::<&str>)?,
        ],
    )
}

fn refresh_tray_menu(app: &AppHandle, lang: &str) {
    let state = app.state::<AppState>();
    if let (Some(tray), Ok(menu)) = (lock(&state.0.tray).as_ref(), tray_menu(app, lang)) {
        let _ = tray.set_menu(Some(menu));
    }
}

fn build_tray(app: &AppHandle, lang: &str) -> tauri::Result<TrayIcon> {
    let mut builder = TrayIconBuilder::new()
        .tooltip("Zanrei")
        .menu(&tray_menu(app, lang)?)
        .show_menu_on_left_click(false)
        .on_menu_event(|app, event| match event.id.as_ref() {
            "open" => show_main(app),
            "quit" => app.exit(0),
            _ => {}
        })
        .on_tray_icon_event(|tray, event| {
            if let TrayIconEvent::Click {
                button: MouseButton::Left,
                button_state: MouseButtonState::Up,
                ..
            } = event
            {
                show_main(tray.app_handle());
            }
        });
    if let Some(icon) = app.default_window_icon() {
        builder = builder.icon(icon.clone());
    }
    builder.build(app)
}

// ---- updates

fn set_update(app: &AppHandle, s: &Inner, f: impl FnOnce(&mut UpdateStatus)) {
    let snapshot = {
        let mut u = lock(&s.update);
        f(&mut u);
        u.clone()
    };
    let _ = app.emit(UPDATE_EVENT, snapshot);
}

async fn check_update_inner(app: &AppHandle, s: &Inner) -> UpdateStatus {
    set_update(app, s, |u| {
        u.checking = true;
        u.error = None;
    });
    let found = match app.updater() {
        Ok(updater) => updater.check().await,
        Err(e) => Err(e),
    };
    match found {
        Ok(update) => {
            let info = update.as_ref().map(|u| UpdateInfo {
                version: u.version.clone(),
                notes: u.body.clone(),
                date: u.date.map(|d| d.to_string()),
            });
            *lock(&s.pending_update) = update;
            set_update(app, s, |u| {
                u.available = info;
                u.checking = false;
                u.last_checked_unix = Some(now_unix());
            });
        }
        Err(e) => set_update(app, s, |u| {
            u.checking = false;
            u.error = Some(e.to_string());
        }),
    }
    lock(&s.update).clone()
}

/// Downloads the release, then runs its installer. On Windows the installer takes over and the app exits
/// here; the NSIS package starts the new version when it is done.
async fn install_update_inner(app: &AppHandle, s: &Inner) -> Result<(), String> {
    let update = lock(&s.pending_update).clone().ok_or("no update available")?;
    set_update(app, s, |u| {
        u.installing = true;
        u.downloaded = 0;
        u.total = None;
        u.error = None;
    });
    let (mut downloaded, mut reported) = (0u64, 0u64);
    let result = update
        .download_and_install(
            |chunk, total| {
                downloaded += chunk as u64;
                // Chunks are tiny; the UI only needs a smooth bar.
                if downloaded - reported >= 256 * 1024 || Some(downloaded) == total {
                    reported = downloaded;
                    set_update(app, s, |u| {
                        u.downloaded = downloaded;
                        u.total = total;
                    });
                }
            },
            || {},
        )
        .await;
    match result {
        Ok(()) => {
            restore_boost(s);
            #[cfg(not(windows))]
            app.restart();
            #[cfg(windows)]
            Ok(())
        }
        Err(e) => {
            let msg = e.to_string();
            set_update(app, s, |u| {
                u.installing = false;
                u.error = Some(msg.clone());
            });
            Err(msg)
        }
    }
}

#[tauri::command]
fn update_status(s: State<'_, AppState>) -> UpdateStatus {
    lock(&s.0.update).clone()
}

#[tauri::command]
async fn check_update(app: AppHandle, s: State<'_, AppState>) -> Res<UpdateStatus> {
    Ok(check_update_inner(&app, &s.inner().clone().0).await)
}

#[tauri::command]
async fn install_update(app: AppHandle, s: State<'_, AppState>) -> Res<()> {
    install_update_inner(&app, &s.inner().clone().0).await
}

/// Checks shortly after start and then every few hours. With "install updates automatically" on, it installs
/// right away, except while a game is running or the first-run wizard is still open.
fn spawn_updater(app: AppHandle, state: AppState) {
    std::thread::spawn(move || {
        std::thread::sleep(Duration::from_secs(30));
        loop {
            tauri::async_runtime::block_on(async {
                let s = &state.0;
                let status = check_update_inner(&app, s).await;
                let (auto, ready) = {
                    let st = lock(&s.settings);
                    (st.auto_update, st.setup_done)
                };
                if auto && ready && status.available.is_some() && !lock(&s.boost).active {
                    let _ = install_update_inner(&app, s).await;
                }
            });
            std::thread::sleep(UPDATE_CHECK_EVERY);
        }
    });
}

// ---- game boost

/// While a known game is running, the high-performance power plan is active; the previous plan is
/// written to the settings first so a crash can never leave the PC stuck on it.
fn boost_tick(app: &AppHandle, s: &Inner, running: Option<String>) {
    let want = lock(&s.settings).game_boost && running.is_some();
    let mut status = lock(&s.boost);
    let changed = match (want, status.active) {
        (true, false) => {
            let activated = power::active_scheme(&*s.platform).and_then(|prev| {
                if prev != power::HIGH_PERFORMANCE {
                    s.update_settings(|st| st.boost_restore_scheme = Some(prev))?;
                    power::set_scheme(&*s.platform, power::HIGH_PERFORMANCE)?;
                }
                Ok(())
            });
            if activated.is_ok() {
                *status = BoostStatus {
                    active: true,
                    game: running,
                };
            }
            activated.is_ok()
        }
        (false, true) => {
            restore_boost(s);
            *status = BoostStatus::default();
            true
        }
        _ => false,
    };
    if changed {
        let _ = app.emit(BOOST_EVENT, status.clone());
    }
}

fn restore_boost(s: &Inner) {
    let previous = lock(&s.settings).boost_restore_scheme.clone();
    if let Some(guid) = previous
        && power::set_scheme(&*s.platform, &guid).is_ok()
    {
        let _ = s.update_settings(|st| st.boost_restore_scheme = None);
    }
}

fn spawn_boost_watcher(app: AppHandle, state: AppState) {
    std::thread::spawn(move || {
        let mut sys = System::new();
        let mut known: HashSet<String> = HashSet::new();
        let mut scanned: Option<Instant> = None;
        loop {
            std::thread::sleep(Duration::from_secs(5));
            let s = &state.0;
            if !lock(&s.settings).game_boost && !lock(&s.boost).active {
                continue;
            }
            if scanned.is_none_or(|t| t.elapsed() > Duration::from_secs(300)) {
                known = games::exe_names(&s.refresh_games());
                scanned = Some(Instant::now());
            }
            sys.refresh_processes(ProcessesToUpdate::All, true);
            let running = games::running_game(
                &known,
                sys.processes()
                    .values()
                    .map(|p| p.name().to_string_lossy().into_owned()),
            );
            boost_tick(&app, s, running);
        }
    });
}

pub fn run() {
    let background = std::env::args().any(|a| a == "--background");

    tauri::Builder::default()
        // Must be first: a second launch (for example from the Start menu) just brings the first window back.
        .plugin(tauri_plugin_single_instance::init(|app, _, _| show_main(app)))
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .setup(move |app| {
            let window = app.get_webview_window("main");
            let mica = window.as_ref().is_some_and(|w| {
                w.set_effects(EffectsBuilder::new().effect(Effect::Mica).build())
                    .is_ok()
            });

            let dir = app.path().app_data_dir()?;
            let loaded = settings::load(&dir);
            let state = AppState(Arc::new(Inner {
                platform: platform::current(),
                store: Store::new(dir.clone()),
                dir,
                mica,
                change_lock: Mutex::new(()),
                settings: Mutex::new(loaded.clone()),
                session: Mutex::new(None),
                pending_restart: Mutex::new(Restart::None),
                system: Mutex::new(None),
                games: Mutex::new(vec![]),
                boost: Mutex::new(BoostStatus::default()),
                tray: Mutex::new(None),
                update: Mutex::new(UpdateStatus {
                    current: app.package_info().version.to_string(),
                    ..UpdateStatus::default()
                }),
                pending_update: Mutex::new(None),
            }));
            app.manage(state.clone());

            // A previous run may have died while Game Boost was active.
            restore_boost(&state.0);

            let lang = loaded.language.as_deref().unwrap_or("en");
            // The tray is the only way back to a hidden window, so it exists whenever background mode could hide it.
            *lock(&state.0.tray) = build_tray(app.handle(), lang).ok();

            // Started by the logon task: stay out of the way, but never hide the first-run wizard.
            if !(background && loaded.setup_done && loaded.run_in_background) {
                show_main(app.handle());
            }

            spawn_boost_watcher(app.handle().clone(), state.clone());
            spawn_updater(app.handle().clone(), state.clone());

            if loaded.setup_done && loaded.mode == Mode::Auto {
                let s = state;
                std::thread::spawn(move || {
                    s.0.apply_recommended(false);
                });
            }
            Ok(())
        })
        .on_window_event(|window, event| {
            if let WindowEvent::CloseRequested { api, .. } = event {
                // There is no close button; Alt+F4 or the taskbar menu lands here.
                let hide = lock(&window.state::<AppState>().0.settings).run_in_background;
                if hide {
                    api.prevent_close();
                    let _ = window.hide();
                }
            }
        })
        .invoke_handler(tauri::generate_handler![
            detect_system,
            list_snapshots,
            create_snapshot,
            rollback_snapshot,
            open_system_restore,
            list_tweaks,
            set_tweak,
            apply_recommended,
            clean_temp,
            pending_restart,
            restart_now,
            cancel_restart,
            restart_explorer,
            list_games,
            set_game_option,
            add_custom_game,
            remove_custom_game,
            boost_status,
            get_settings,
            save_preferences,
            mica_enabled,
            get_autostart,
            set_autostart,
            send_to_background,
            quit_app,
            update_status,
            check_update,
            install_update,
        ])
        .build(tauri::generate_context!())
        .expect("error while building Zanrei")
        .run(|app, event| {
            if let RunEvent::Exit = event
                && let Some(state) = app.try_state::<AppState>()
            {
                restore_boost(&state.0);
            }
        });
}
