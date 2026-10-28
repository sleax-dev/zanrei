//! Finds installed games and applies per-game Windows settings. Everything here is read-only discovery
//! plus registry values written through the snapshot journal.

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

const SKIP_WORDS: &[&str] = &[
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
    "webhelper",
    "notification",
    "eac_",
];

/// Largest plausible game executables under `dir` (installers, redistributables and crash reporters skipped).
pub fn find_exes(dir: &Path, max: usize) -> Vec<PathBuf> {
    fn walk(dir: &Path, depth: u32, out: &mut Vec<(u64, PathBuf)>) {
        for e in std::fs::read_dir(dir).into_iter().flatten().flatten() {
            let path = e.path();
            let Ok(meta) = e.metadata() else { continue };
            let name = e.file_name().to_string_lossy().to_ascii_lowercase();
            if meta.is_dir() {
                if depth < 3 && !SKIP_WORDS.iter().any(|w| name.contains(w)) && !name.starts_with('_') {
                    walk(&path, depth + 1, out);
                }
            } else if name.ends_with(".exe") && !SKIP_WORDS.iter().any(|w| name.contains(w)) {
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

    let mut libs = vec![root.clone()];
    if let Ok(text) = std::fs::read_to_string(root.join("steamapps/libraryfolders.vdf")) {
        libs.extend(vdf_values(&text, "path").into_iter().map(PathBuf::from));
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
            ];
            if dir.is_dir() && !tool.iter().any(|w| lower.contains(w)) {
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
}

fn epic() -> Vec<Found> {
    let base = std::env::var_os("ProgramData")
        .map(PathBuf::from)
        .unwrap_or_else(|| "C:\\ProgramData".into());
    std::fs::read_dir(base.join(r"Epic\EpicGamesLauncher\Data\Manifests"))
        .into_iter()
        .flatten()
        .flatten()
        .filter(|e| e.path().extension().is_some_and(|x| x == "item"))
        .filter_map(|e| serde_json::from_slice::<EpicItem>(&std::fs::read(e.path()).ok()?).ok())
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
                let exe = reg_string(p, Hive::Hklm, &path, "exe").map(PathBuf::from);
                out.push(Found {
                    name,
                    launcher: "GOG",
                    dir: dir.into(),
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

/// Microsoft Store / Xbox app games install under `<drive>:\XboxGames\<Game>\Content`.
fn xbox(roots: &[PathBuf]) -> Vec<Found> {
    roots
        .iter()
        .flat_map(|r| std::fs::read_dir(r.join("XboxGames")).into_iter().flatten().flatten())
        .filter(|e| e.path().is_dir())
        .map(|e| {
            let dir = e.path();
            let content = dir.join("Content");
            Found {
                name: e.file_name().to_string_lossy().into_owned(),
                launcher: "Xbox",
                dir: if content.is_dir() { content } else { dir },
                exe: None,
            }
        })
        .collect()
}

pub fn detect(p: &dyn Platform, drive_roots: &[PathBuf], custom: &[CustomGame]) -> Vec<Game> {
    let mut found: Vec<Found> = steam(p);
    found.extend(epic());
    found.extend(registry_launchers(p));
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
                for e in find_exes(&f.dir, 4) {
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

/// Lower-cased executable file names of every game, for matching against running processes.
pub fn exe_names(games: &[Game]) -> HashSet<String> {
    games
        .iter()
        .flat_map(|g| g.exes.iter())
        .filter_map(|e| {
            Path::new(e)
                .file_name()
                .map(|n| n.to_string_lossy().to_ascii_lowercase())
        })
        .collect()
}

/// The first running process that is one of the known game executables (names compared lower-cased).
pub fn running_game(known: &HashSet<String>, running: impl Iterator<Item = String>) -> Option<String> {
    running.map(|n| n.to_ascii_lowercase()).find(|n| known.contains(n))
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

    #[test]
    fn spots_a_running_game() {
        let known = HashSet::from(["game.exe".to_string()]);
        assert_eq!(
            running_game(&known, ["explorer.exe".to_string(), "Game.EXE".to_string()].into_iter()).as_deref(),
            Some("game.exe")
        );
        assert_eq!(running_game(&known, ["explorer.exe".to_string()].into_iter()), None);
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
        std::fs::write(d.path().join("bin/game.exe"), vec![0u8; 5000]).unwrap();
        std::fs::write(d.path().join("unins000.exe"), vec![0u8; 9000]).unwrap();
        std::fs::write(d.path().join("UnityCrashHandler64.exe"), vec![0u8; 9000]).unwrap();
        std::fs::write(d.path().join("readme.txt"), vec![0u8; 9999]).unwrap();
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
        assert_eq!(exe_names(&games), HashSet::from(["foo.exe".to_string()]));
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
