//! Finds installed games and applies per-game Windows settings. Discovery is read-only: it reads each launcher's own
//! records (Steam manifests, Epic manifests, GOG and Xbox game files, launcher registry keys) rather than guessing from
//! folder names, and tells running games apart by where their process lives, not just by file name. Settings are
//! registry values written through the snapshot journal.

use crate::Result;
use crate::kv::{flags_add, flags_has, flags_remove, kv_get, kv_remove, kv_set};
use crate::platform::{Hive, Platform, RegKey, RegValue};
use crate::restore::Store;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::path::{Path, PathBuf};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, Eq)]
pub struct CustomGame {
    pub name: String,
    pub exe: String,
}

#[derive(Serialize, Clone, Debug, PartialEq, Eq)]
pub struct Game {
    /// Stable id: the lower-cased path of the main executable.
    pub id: String,
    pub name: String,
    pub launcher: String,
    pub dir: String,
    pub exe: String,
    /// Every executable worth watching for Game Boost (main one first).
    pub exes: Vec<String>,
}

struct Found {
    name: String,
    launcher: &'static str,
    dir: PathBuf,
    exe: Option<PathBuf>,
}

/// File or folder names (lower-case, substring) that are never the game itself: installers, redistributables, crash
/// reporters, anti-cheat and launcher helpers.
const HELPER_WORDS: &[&str] = &[
    "unins",
    "setup",
    "install",
    "redist",
    "crash",
    "report",
    "dxsetup",
    "vcredist",
    "dotnet",
    "prereq",
    "easyanticheat",
    "beservice",
    "battleye",
    "updater",
    "launcher_helper",
    "cefprocess",
    "cefsub",
    "subprocess",
    "webhelper",
    "helper",
    "notification",
    "eac_",
];

/// Folders that hold engines, tools and runtimes, never the game's own executable.
const SKIP_DIRS: &[&str] = &["engine", "tools", "support", "mono", "managed", "directx"];

/// Executables smaller than this are launcher stubs and shims, not games.
const MIN_EXE_BYTES: u64 = 200 * 1024;

fn is_helper(lower_name: &str) -> bool {
    HELPER_WORDS.iter().any(|w| lower_name.contains(w))
}

/// Largest plausible game executables under `dir` (installers, redistributables and crash reporters skipped).
pub fn find_exes(dir: &Path, max: usize) -> Vec<PathBuf> {
    fn walk(dir: &Path, depth: u32, out: &mut Vec<(u64, PathBuf)>) {
        for e in std::fs::read_dir(dir).into_iter().flatten().flatten() {
            let path = e.path();
            let Ok(meta) = e.metadata() else { continue };
            let name = e.file_name().to_string_lossy().to_ascii_lowercase();
            if meta.is_dir() {
                if depth < 3 && !is_helper(&name) && !SKIP_DIRS.contains(&name.as_str()) && !name.starts_with('_') {
                    walk(&path, depth + 1, out);
                }
            } else if name.ends_with(".exe") && !is_helper(&name) && meta.len() >= MIN_EXE_BYTES {
                out.push((meta.len(), path));
            }
        }
    }
    let mut found = vec![];
    walk(dir, 0, &mut found);
    found.sort_by_key(|(size, _)| std::cmp::Reverse(*size));
    found.into_iter().take(max).map(|(_, p)| p).collect()
}

fn vdf_values(text: &str, key: &str) -> Vec<String> {
    text.lines()
        .filter_map(|l| {
            let mut q = l.split('"').filter(|s| !s.trim().is_empty());
            let (k, v) = (q.next()?, q.next()?);
            k.eq_ignore_ascii_case(key).then(|| v.replace("\\\\", "\\"))
        })
        .collect()
}

/// `<Tag ... Attr="value" ...>`: the first such attribute. Enough for the small config files launchers write.
fn xml_attr(text: &str, tag: &str, attr: &str) -> Option<String> {
    let start = text.find(&format!("<{tag}"))?;
    let element = &text[start..start + text[start..].find('>')?];
    let rest = &element[element.find(&format!("{attr}=\""))? + attr.len() + 2..];
    Some(rest[..rest.find('"')?].to_string())
}

fn program_data() -> PathBuf {
    std::env::var_os("ProgramData")
        .map(PathBuf::from)
        .unwrap_or_else(|| "C:\\ProgramData".into())
}

fn steam(p: &dyn Platform) -> Vec<Found> {
    let root = [
        (Hive::Hklm, r"SOFTWARE\WOW6432Node\Valve\Steam", "InstallPath"),
        (Hive::Hklm, r"SOFTWARE\Valve\Steam", "InstallPath"),
        (Hive::Hkcu, r"Software\Valve\Steam", "SteamPath"),
    ]
    .iter()
    .find_map(|(h, path, name)| match p.reg_get(&RegKey::new(*h, path, name)) {
        Ok(Some(RegValue::String(s))) if Path::new(&s).is_dir() => Some(PathBuf::from(s)),
        _ => None,
    });
    let Some(root) = root else { return vec![] };

    // Newer clients keep the list in config/, older ones in steamapps/; read both.
    let mut libs = vec![root.clone()];
    for file in ["config/libraryfolders.vdf", "steamapps/libraryfolders.vdf"] {
        if let Ok(text) = std::fs::read_to_string(root.join(file)) {
            libs.extend(vdf_values(&text, "path").into_iter().map(PathBuf::from));
        }
    }
    let mut seen = HashSet::new();
    let mut out = vec![];
    for lib in libs
        .into_iter()
        .filter(|l| seen.insert(l.to_string_lossy().to_ascii_lowercase()))
    {
        let apps = lib.join("steamapps");
        for e in std::fs::read_dir(&apps).into_iter().flatten().flatten() {
            let file = e.file_name().to_string_lossy().into_owned();
            if !(file.starts_with("appmanifest_") && file.ends_with(".acf")) {
                continue;
            }
            let Ok(text) = std::fs::read_to_string(e.path()) else {
                continue;
            };
            // StateFlags bit 4 = fully installed; a download in progress or an update half-way does not count yet.
            let installed = vdf_values(&text, "StateFlags")
                .first()
                .and_then(|f| f.parse::<u32>().ok())
                .is_none_or(|f| f & 4 != 0);
            let (name, dir) = (vdf_values(&text, "name"), vdf_values(&text, "installdir"));
            let (Some(name), Some(dir)) = (name.first(), dir.first()) else {
                continue;
            };
            let dir = apps.join("common").join(dir);
            let lower = name.to_ascii_lowercase();
            let tool = [
                "redistributable",
                "steamworks",
                "runtime",
                "proton",
                "dedicated server",
                "sdk",
                "soundtrack",
            ];
            if installed && dir.is_dir() && !tool.iter().any(|w| lower.contains(w)) {
                out.push(Found {
                    name: name.clone(),
                    launcher: "Steam",
                    dir,
                    exe: None,
                });
            }
        }
    }
    out
}

#[derive(Deserialize)]
#[serde(rename_all = "PascalCase")]
struct EpicItem {
    display_name: Option<String>,
    install_location: Option<String>,
    launch_executable: Option<String>,
    app_name: Option<String>,
    main_game_app_name: Option<String>,
    #[serde(rename = "bIsIncompleteInstall")]
    incomplete: Option<bool>,
}

fn epic() -> Vec<Found> {
    std::fs::read_dir(program_data().join(r"Epic\EpicGamesLauncher\Data\Manifests"))
        .into_iter()
        .flatten()
        .flatten()
        .filter(|e| e.path().extension().is_some_and(|x| x == "item"))
        .filter_map(|e| serde_json::from_slice::<EpicItem>(&std::fs::read(e.path()).ok()?).ok())
        // Skip half-finished installs, add-ons (their app name differs from the base game's) and Unreal Engine itself.
        .filter(|i| !i.incomplete.unwrap_or(false))
        .filter(|i| match (&i.app_name, &i.main_game_app_name) {
            (Some(app), Some(main)) => app == main && !app.starts_with("UE_"),
            _ => true,
        })
        .filter_map(|i| {
            let (dir, exe) = (
                PathBuf::from(i.install_location?),
                i.launch_executable.filter(|e| !e.is_empty())?,
            );
            Some(Found {
                name: i.display_name?,
                launcher: "Epic Games",
                exe: Some(dir.join(exe)),
                dir,
            })
        })
        .collect()
}

fn reg_string(p: &dyn Platform, h: Hive, path: &str, name: &str) -> Option<String> {
    match p.reg_get(&RegKey::new(h, path, name)) {
        Ok(Some(RegValue::String(s))) if !s.is_empty() => Some(s),
        _ => None,
    }
}

/// The executable GOG marks as the primary play task in the game's own `goggame-<id>.info`.
fn gog_primary(dir: &Path) -> Option<PathBuf> {
    std::fs::read_dir(dir)
        .ok()?
        .flatten()
        .filter(|e| {
            let n = e.file_name().to_string_lossy().to_ascii_lowercase();
            n.starts_with("goggame-") && n.ends_with(".info")
        })
        .find_map(|e| {
            let info: serde_json::Value = serde_json::from_slice(&std::fs::read(e.path()).ok()?).ok()?;
            info["playTasks"]
                .as_array()?
                .iter()
                .find(|t| t["isPrimary"].as_bool() == Some(true))
                .and_then(|t| t["path"].as_str())
                .map(|rel| dir.join(rel.replace('/', "\\")))
        })
}

/// Registry-based launchers. 32-bit-on-64-bit Windows and 32-bit Windows keep these in different places.
fn registry_launchers(p: &dyn Platform) -> Vec<Found> {
    let mut out = vec![];
    for base in ["SOFTWARE\\WOW6432Node", "SOFTWARE"] {
        let gog = format!(r"{base}\GOG.com\Games");
        for sub in p.reg_subkeys(Hive::Hklm, &gog).unwrap_or_default() {
            let path = format!(r"{gog}\{sub}");
            if let (Some(name), Some(dir)) = (
                reg_string(p, Hive::Hklm, &path, "gameName"),
                reg_string(p, Hive::Hklm, &path, "path"),
            ) {
                let dir = PathBuf::from(dir);
                let exe = gog_primary(&dir).or_else(|| reg_string(p, Hive::Hklm, &path, "exe").map(PathBuf::from));
                out.push(Found {
                    name,
                    launcher: "GOG",
                    dir,
                    exe,
                });
            }
        }
        let ubi = format!(r"{base}\Ubisoft\Launcher\Installs");
        for sub in p.reg_subkeys(Hive::Hklm, &ubi).unwrap_or_default() {
            if let Some(dir) = reg_string(p, Hive::Hklm, &format!(r"{ubi}\{sub}"), "InstallDir") {
                let dir = PathBuf::from(dir.replace('/', "\\"));
                let name = dir.file_name().map(|n| n.to_string_lossy().into_owned()).unwrap_or(sub);
                out.push(Found {
                    name,
                    launcher: "Ubisoft Connect",
                    dir,
                    exe: None,
                });
            }
        }
        let ea = format!(r"{base}\EA Games");
        for sub in p.reg_subkeys(Hive::Hklm, &ea).unwrap_or_default() {
            if let Some(dir) = reg_string(p, Hive::Hklm, &format!(r"{ea}\{sub}"), "Install Dir") {
                out.push(Found {
                    name: sub,
                    launcher: "EA app",
                    dir: dir.into(),
                    exe: None,
                });
            }
        }
    }
    out
}

/// Publishers whose programs in the Windows uninstall list are games (Battle.net and Rockstar have no manifests of
/// their own to read), with the launcher label to show. Their launchers and clients are filtered out by name.
const GAME_PUBLISHERS: &[(&str, &str)] = &[
    ("blizzard entertainment", "Battle.net"),
    ("riot games", "Riot Games"),
    ("rockstar games", "Rockstar Games"),
    ("bethesda softworks", "Bethesda"),
    ("activision", "Activision"),
    ("wargaming", "Wargaming"),
];
const NOT_GAMES: &[&str] = &[
    "battle.net",
    "launcher",
    "client",
    "social club",
    "bethesda.net",
    "vanguard",
    "anti-cheat",
];

fn uninstall_list(p: &dyn Platform) -> Vec<Found> {
    let mut out = vec![];
    for (hive, base) in [
        (Hive::Hklm, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall"),
        (
            Hive::Hklm,
            r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Uninstall",
        ),
        (Hive::Hkcu, r"Software\Microsoft\Windows\CurrentVersion\Uninstall"),
    ] {
        for sub in p.reg_subkeys(hive, base).unwrap_or_default() {
            let path = format!(r"{base}\{sub}");
            let Some(publisher) = reg_string(p, hive, &path, "Publisher").map(|s| s.to_ascii_lowercase()) else {
                continue;
            };
            let Some(&(_, launcher)) = GAME_PUBLISHERS.iter().find(|(name, _)| publisher.contains(name)) else {
                continue;
            };
            let (Some(name), Some(dir)) = (
                reg_string(p, hive, &path, "DisplayName"),
                reg_string(p, hive, &path, "InstallLocation"),
            ) else {
                continue;
            };
            let dir = PathBuf::from(dir.trim_end_matches(['\\', '/']));
            let lower = name.to_ascii_lowercase();
            if dir.is_dir() && !NOT_GAMES.iter().any(|w| lower.contains(w)) {
                out.push(Found {
                    name,
                    launcher,
                    dir,
                    exe: None,
                });
            }
        }
    }
    out
}

/// Riot writes one settings file per product with the full install path.
fn riot() -> Vec<Found> {
    std::fs::read_dir(program_data().join(r"Riot Games\Metadata"))
        .into_iter()
        .flatten()
        .flatten()
        .flat_map(|d| std::fs::read_dir(d.path()).into_iter().flatten().flatten())
        .filter(|f| f.file_name().to_string_lossy().ends_with(".product_settings.yaml"))
        .filter_map(|f| {
            let text = std::fs::read_to_string(f.path()).ok()?;
            let line = text
                .lines()
                .find_map(|l| l.trim().strip_prefix("product_install_full_path:"))?;
            let dir = PathBuf::from(line.trim().trim_matches(['"', '\'']).replace('/', "\\"));
            let name = dir.file_name()?.to_string_lossy().into_owned();
            (dir.is_dir() && !name.to_ascii_lowercase().contains("client")).then_some(Found {
                name,
                launcher: "Riot Games",
                dir,
                exe: None,
            })
        })
        .collect()
}

/// Microsoft Store / Xbox app games install under `<drive>:\XboxGames\<Game>\Content`; `MicrosoftGame.config`
/// names the executable.
fn xbox(roots: &[PathBuf]) -> Vec<Found> {
    roots
        .iter()
        .flat_map(|r| std::fs::read_dir(r.join("XboxGames")).into_iter().flatten().flatten())
        .filter(|e| e.path().is_dir())
        .map(|e| {
            let dir = e.path();
            let content = dir.join("Content");
            let dir = if content.is_dir() { content } else { dir };
            let config = std::fs::read_to_string(dir.join("MicrosoftGame.config")).unwrap_or_default();
            let exe = xml_attr(&config, "Executable", "Name").map(|n| dir.join(n));
            // The display name is often a resource reference ("ms-resource:..."); the folder name is the fallback.
            let name = xml_attr(&config, "ShellVisuals", "DefaultDisplayName")
                .filter(|n| !n.starts_with("ms-resource") && !n.is_empty())
                .unwrap_or_else(|| e.file_name().to_string_lossy().into_owned());
            Found {
                name,
                launcher: "Xbox",
                dir,
                exe,
            }
        })
        .collect()
}

pub fn detect(p: &dyn Platform, drive_roots: &[PathBuf], custom: &[CustomGame]) -> Vec<Game> {
    let mut found: Vec<Found> = steam(p);
    found.extend(epic());
    found.extend(registry_launchers(p));
    found.extend(riot());
    found.extend(uninstall_list(p));
    found.extend(xbox(drive_roots));
    for c in custom {
        let exe = PathBuf::from(&c.exe);
        found.push(Found {
            name: c.name.clone(),
            launcher: "Custom",
            dir: exe.parent().map(Path::to_path_buf).unwrap_or_default(),
            exe: Some(exe),
        });
    }

    let mut seen = HashSet::new();
    let mut games: Vec<Game> = found
        .into_iter()
        .filter_map(|f| {
            let mut exes: Vec<PathBuf> = f.exe.clone().into_iter().filter(|e| e.is_file()).collect();
            if f.launcher != "Custom" {
                for e in find_exes(&f.dir, 5) {
                    if !exes.contains(&e) {
                        exes.push(e);
                    }
                }
            }
            let exe = exes.first()?.to_string_lossy().into_owned();
            seen.insert(exe.to_ascii_lowercase()).then(|| Game {
                id: exe.to_ascii_lowercase(),
                name: f.name,
                launcher: f.launcher.into(),
                dir: f.dir.to_string_lossy().into_owned(),
                exe,
                exes: exes.iter().map(|e| e.to_string_lossy().into_owned()).collect(),
            })
        })
        .collect();
    games.sort_by_key(|g| g.name.to_ascii_lowercase());
    games
}

fn norm(path: &str) -> String {
    path.to_ascii_lowercase().replace('/', "\\")
}

struct Watched {
    name: String,
    /// Lower-cased executable file names.
    exes: HashSet<String>,
    /// Lower-cased install folder with a trailing backslash; `None` for games the user added by hand,
    /// whose folder may be anything (Downloads, a drive root).
    dir: Option<String>,
}

/// What Game Boost looks for among the running processes.
pub struct Watch(Vec<Watched>);

pub fn watch(games: &[Game]) -> Watch {
    Watch(
        games
            .iter()
            .map(|g| Watched {
                name: g.name.clone(),
                exes: g
                    .exes
                    .iter()
                    .map(|e| e.rsplit(['\\', '/']).next().unwrap_or(e).to_ascii_lowercase())
                    .collect(),
                dir: (g.launcher != "Custom" && !g.dir.is_empty())
                    .then(|| format!("{}\\", norm(g.dir.trim_end_matches(['\\', '/'])))),
            })
            .collect(),
    )
}

impl Watch {
    /// The name of the first game that has a running process. A process counts when it is one of the game's known
    /// executables, or when it runs from inside the game's folder (the real executable is often not one of the few
    /// we picked, and many games start through a differently named binary). Crash handlers, helpers and launchers
    /// never count on their own.
    pub fn running(&self, processes: impl Iterator<Item = (String, Option<PathBuf>)>) -> Option<String> {
        for (name, path) in processes {
            let lower = name.to_ascii_lowercase();
            if is_helper(&lower) {
                continue;
            }
            let by_folder = !["launcher", "client", "updater"].iter().any(|w| lower.contains(w));
            let path = path.map(|p| norm(&p.to_string_lossy()));
            for w in &self.0 {
                let in_folder = by_folder
                    && w.dir
                        .as_ref()
                        .zip(path.as_ref())
                        .is_some_and(|(dir, p)| p.starts_with(dir.as_str()));
                if w.exes.contains(&lower) || in_folder {
                    return Some(w.name.clone());
                }
            }
        }
        None
    }
}

// ---- per-game settings

#[derive(Serialize, Clone, Copy, Debug, PartialEq, Eq, Default)]
pub struct GameOptions {
    /// Windows Graphics settings: run this game on the high-performance GPU.
    pub high_gpu: bool,
    /// Disable fullscreen optimizations for this executable.
    pub no_fso: bool,
    /// Start this executable with High CPU priority.
    pub high_priority: bool,
}

#[derive(Deserialize, Clone, Copy, Debug, PartialEq, Eq)]
pub enum GameOption {
    HighGpu,
    NoFso,
    HighPriority,
}

const FSO_FLAG: &str = "DISABLEDXMAXIMIZEDWINDOWEDMODE";

fn gpu_key(exe: &str) -> RegKey {
    RegKey::new(Hive::Hkcu, r"Software\Microsoft\DirectX\UserGpuPreferences", exe)
}

fn layers_key(exe: &str) -> RegKey {
    RegKey::new(
        Hive::Hkcu,
        r"Software\Microsoft\Windows NT\CurrentVersion\AppCompatFlags\Layers",
        exe,
    )
}

fn priority_key(exe: &str) -> RegKey {
    let file = Path::new(exe)
        .file_name()
        .map(|n| n.to_string_lossy().into_owned())
        .unwrap_or_default();
    RegKey::new(
        Hive::Hklm,
        &format!(r"SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\{file}\PerfOptions"),
        "CpuPriorityClass",
    )
}

fn string_at(p: &dyn Platform, key: &RegKey) -> Result<String> {
    Ok(match p.reg_get(key)? {
        Some(RegValue::String(s)) => s,
        _ => String::new(),
    })
}

pub fn options(p: &dyn Platform, exe: &str) -> Result<GameOptions> {
    Ok(GameOptions {
        high_gpu: kv_get(&string_at(p, &gpu_key(exe))?, "GpuPreference") == Some("2"),
        no_fso: flags_has(&string_at(p, &layers_key(exe))?, FSO_FLAG),
        high_priority: p.reg_get(&priority_key(exe))? == Some(RegValue::Dword(3)),
    })
}

pub fn set_option(store: &Store, p: &dyn Platform, sid: &str, exe: &str, option: GameOption, on: bool) -> Result<()> {
    match option {
        GameOption::HighGpu => {
            let key = gpu_key(exe);
            let cur = string_at(p, &key)?;
            let new = if on {
                kv_set(&cur, "GpuPreference", "2")
            } else {
                kv_remove(&cur, "GpuPreference")
            };
            write_or_delete(store, p, sid, &key, (!new.is_empty()).then_some(new))
        }
        GameOption::NoFso => {
            let key = layers_key(exe);
            let cur = string_at(p, &key)?;
            let new = if on {
                Some(flags_add(&cur, FSO_FLAG))
            } else {
                flags_remove(&cur, FSO_FLAG)
            };
            write_or_delete(store, p, sid, &key, new)
        }
        GameOption::HighPriority => {
            let key = priority_key(exe);
            if on {
                store.reg_set(p, sid, &key, &RegValue::Dword(3))
            } else {
                store.reg_delete(p, sid, &key)
            }
        }
    }
}

fn write_or_delete(store: &Store, p: &dyn Platform, sid: &str, key: &RegKey, value: Option<String>) -> Result<()> {
    match value {
        Some(v) => store.reg_set(p, sid, key, &RegValue::String(v)),
        None => store.reg_delete(p, sid, key),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::restore::tests::Fake;

    fn game(name: &str, launcher: &str, dir: &str, exe: &str) -> Game {
        Game {
            id: exe.to_ascii_lowercase(),
            name: name.into(),
            launcher: launcher.into(),
            dir: dir.into(),
            exe: exe.into(),
            exes: vec![exe.into()],
        }
    }

    fn procs(list: &[(&str, Option<&str>)]) -> impl Iterator<Item = (String, Option<PathBuf>)> {
        list.iter()
            .map(|(n, p)| (n.to_string(), p.map(PathBuf::from)))
            .collect::<Vec<_>>()
            .into_iter()
    }

    #[test]
    fn spots_a_running_game_by_name_or_by_folder() {
        let w = watch(&[
            game("Foo", "Steam", r"D:\Steam\common\Foo", r"D:\Steam\common\Foo\Foo.exe"),
            game(
                "Bar",
                "Custom",
                r"C:\Users\me\Downloads",
                r"C:\Users\me\Downloads\bar.exe",
            ),
        ]);
        let shell = Some(r"C:\Windows\explorer.exe");
        assert_eq!(w.running(procs(&[("explorer.exe", shell)])), None);
        assert_eq!(
            w.running(procs(&[("explorer.exe", shell), ("FOO.EXE", None)]))
                .as_deref(),
            Some("Foo")
        );
        // a differently named binary inside the game's folder still counts (forward slashes and case do not matter)
        let inside = Some("d:/steam/common/foo/bin/Shipping-Win64.exe");
        assert_eq!(
            w.running(procs(&[("Shipping-Win64.exe", inside)])).as_deref(),
            Some("Foo")
        );
        // ... but not a crash handler, a launcher, or a folder that merely starts with the same letters
        assert_eq!(w.running(procs(&[("CrashHandler.exe", inside)])), None);
        assert_eq!(w.running(procs(&[("FooLauncher.exe", inside)])), None);
        assert_eq!(
            w.running(procs(&[("x.exe", Some(r"D:\Steam\common\Foo2\x.exe"))])),
            None
        );
        // a hand-added game is matched by name only: its folder (Downloads) says nothing about other programs
        assert_eq!(
            w.running(procs(&[("other.exe", Some(r"C:\Users\me\Downloads\other.exe"))])),
            None
        );
        assert_eq!(w.running(procs(&[("bar.exe", None)])).as_deref(), Some("Bar"));
    }

    #[test]
    fn reads_launcher_files() {
        let config =
            r#"<Game><Executable Name="Halo.exe" TargetDevice="PC"/><ShellVisuals DefaultDisplayName="Halo" /></Game>"#;
        assert_eq!(xml_attr(config, "Executable", "Name").as_deref(), Some("Halo.exe"));
        assert_eq!(
            xml_attr(config, "ShellVisuals", "DefaultDisplayName").as_deref(),
            Some("Halo")
        );
        assert_eq!(xml_attr("<A/>", "Executable", "Name"), None);

        let d = tempfile::tempdir().unwrap();
        std::fs::write(
            d.path().join("goggame-123.info"),
            r#"{"playTasks":[{"isPrimary":false,"path":"tool.exe"},{"isPrimary":true,"path":"bin/Game.exe"}]}"#,
        )
        .unwrap();
        assert_eq!(gog_primary(d.path()), Some(d.path().join("bin\\Game.exe")));
    }

    #[test]
    fn parses_steam_vdf() {
        let lib = "\"libraryfolders\"\n{\n\t\"0\"\n\t{\n\t\t\"path\"\t\t\"D:\\\\SteamLibrary\"\n\t}\n}";
        assert_eq!(vdf_values(lib, "path"), vec!["D:\\SteamLibrary"]);
        let acf = "\"AppState\"\n{\n\t\"appid\"\t\t\"730\"\n\t\"name\"\t\t\"Counter-Strike 2\"\n\t\"installdir\"\t\t\"Counter-Strike Global Offensive\"\n}";
        assert_eq!(vdf_values(acf, "name"), vec!["Counter-Strike 2"]);
        assert_eq!(vdf_values(acf, "installdir"), vec!["Counter-Strike Global Offensive"]);
    }

    #[test]
    fn finds_the_game_exe_and_skips_helpers() {
        let d = tempfile::tempdir().unwrap();
        std::fs::create_dir_all(d.path().join("bin")).unwrap();
        std::fs::create_dir_all(d.path().join("Engine/Binaries")).unwrap();
        std::fs::write(d.path().join("bin/game.exe"), vec![0u8; 300_000]).unwrap();
        std::fs::write(d.path().join("unins000.exe"), vec![0u8; 900_000]).unwrap();
        std::fs::write(d.path().join("UnityCrashHandler64.exe"), vec![0u8; 900_000]).unwrap();
        std::fs::write(d.path().join("Engine/Binaries/ue.exe"), vec![0u8; 900_000]).unwrap(); // engine tooling
        std::fs::write(d.path().join("stub.exe"), vec![0u8; 5000]).unwrap(); // launcher shim
        std::fs::write(d.path().join("readme.txt"), vec![0u8; 999_999]).unwrap();
        let exes = find_exes(d.path(), 4);
        assert_eq!(exes.len(), 1);
        assert!(exes[0].ends_with("game.exe"));
    }

    #[test]
    fn custom_games_are_detected_and_deduplicated() {
        let d = tempfile::tempdir().unwrap();
        let exe = d.path().join("Foo.exe");
        std::fs::write(&exe, [0u8; 10]).unwrap();
        let c = CustomGame {
            name: "Foo".into(),
            exe: exe.to_string_lossy().into_owned(),
        };
        let games = detect(&Fake::default(), &[], &[c.clone(), c]);
        assert_eq!(games.len(), 1);
        assert_eq!(games[0].launcher, "Custom");
    }

    #[test]
    fn per_game_options_roundtrip_without_clobbering_other_settings() {
        let dir = tempfile::tempdir().unwrap();
        let (store, p) = (Store::new(dir.path().into()), Fake::default());
        let sid = store.create(&p, "t").unwrap().id;
        let exe = r"D:\Games\Foo\Foo.exe";
        p.reg_set(&layers_key(exe), &RegValue::String("~ HIGHDPIAWARE".into()))
            .unwrap();
        p.reg_set(&gpu_key(exe), &RegValue::String("AutoHDREnable=1;".into()))
            .unwrap();

        for o in [GameOption::HighGpu, GameOption::NoFso, GameOption::HighPriority] {
            set_option(&store, &p, &sid, exe, o, true).unwrap();
        }
        assert_eq!(
            options(&p, exe).unwrap(),
            GameOptions {
                high_gpu: true,
                no_fso: true,
                high_priority: true
            }
        );
        assert_eq!(
            string_at(&p, &gpu_key(exe)).unwrap(),
            "AutoHDREnable=1;GpuPreference=2;"
        );

        for o in [GameOption::HighGpu, GameOption::NoFso, GameOption::HighPriority] {
            set_option(&store, &p, &sid, exe, o, false).unwrap();
        }
        assert_eq!(options(&p, exe).unwrap(), GameOptions::default());
        assert_eq!(string_at(&p, &layers_key(exe)).unwrap(), "~ HIGHDPIAWARE");
        assert_eq!(string_at(&p, &gpu_key(exe)).unwrap(), "AutoHDREnable=1;");
    }
}
