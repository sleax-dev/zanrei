use std::{path::PathBuf, sync::Arc};
use tauri::{
    window::{Effect, EffectsBuilder},
    Manager, State,
};
use zanrei_core::{
    platform::{self, Platform},
    restore::{Snapshot, Store},
    settings::{self, Settings},
    system::{self, SystemInfo},
};

#[derive(Clone)]
struct AppState {
    platform: Arc<dyn Platform>,
    store: Store,
    dir: PathBuf,
    /// Mica only exists on Windows 11; on 10 the UI falls back to a solid background.
    mica: bool,
}

type Res<T> = Result<T, String>;

/// Everything below shells out to PowerShell or touches disk, so keep it off the UI thread.
async fn blocking<T: Send + 'static>(f: impl FnOnce() -> zanrei_core::Result<T> + Send + 'static) -> Res<T> {
    tauri::async_runtime::spawn_blocking(f).await.map_err(|e| e.to_string())?.map_err(|e| e.to_string())
}

#[tauri::command]
async fn detect_system(s: State<'_, AppState>) -> Res<SystemInfo> {
    let s = s.inner().clone();
    blocking(move || Ok(system::detect(&*s.platform))).await
}

#[tauri::command]
async fn list_snapshots(s: State<'_, AppState>) -> Res<Vec<Snapshot>> {
    let s = s.inner().clone();
    blocking(move || Ok(s.store.list())).await
}

#[tauri::command]
async fn create_snapshot(s: State<'_, AppState>, label: String) -> Res<Snapshot> {
    let s = s.inner().clone();
    blocking(move || s.store.create(&*s.platform, &label)).await
}

#[tauri::command]
async fn rollback_snapshot(s: State<'_, AppState>, id: String) -> Res<()> {
    let s = s.inner().clone();
    blocking(move || s.store.rollback(&*s.platform, &id)).await
}

#[tauri::command]
async fn open_system_restore(s: State<'_, AppState>) -> Res<()> {
    let s = s.inner().clone();
    blocking(move || s.platform.open_system_restore()).await
}

#[tauri::command]
async fn get_settings(s: State<'_, AppState>) -> Res<Settings> {
    let s = s.inner().clone();
    blocking(move || Ok(settings::load(&s.dir))).await
}

#[tauri::command]
async fn save_settings(s: State<'_, AppState>, settings: Settings) -> Res<()> {
    let s = s.inner().clone();
    blocking(move || settings::save(&s.dir, &settings)).await
}

#[tauri::command]
fn mica_enabled(s: State<'_, AppState>) -> bool {
    s.mica
}

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .setup(|app| {
            let mica = app.get_webview_window("main").is_some_and(|w| {
                w.set_effects(EffectsBuilder::new().effect(Effect::Mica).build()).is_ok()
            });
            let dir = app.path().app_data_dir()?;
            app.manage(AppState { platform: Arc::from(platform::current()), store: Store::new(dir.clone()), dir, mica });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            detect_system,
            list_snapshots,
            create_snapshot,
            rollback_snapshot,
            open_system_restore,
            get_settings,
            save_settings,
            mica_enabled,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Zanrei");
}
