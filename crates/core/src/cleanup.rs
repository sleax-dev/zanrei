//! Disk cleanup. Everything here deletes for good, so the UI measures first (`size`), lets the user pick, and only
//! then runs `clean`. Shader caches are deliberately not on the list: deleting them makes games stutter until they rebuild.

use crate::Result;
use crate::platform::Platform;
use serde::Serialize;
use std::path::{Path, PathBuf};
use std::time::{Duration, SystemTime};

const HOUR: Duration = Duration::from_secs(3600);
const DAY: Duration = Duration::from_secs(24 * 3600);

/// Ids double as translation keys (`cleanup.item.<id>`).
pub const RECYCLE_BIN: &str = "recycle_bin";
pub const IDS: &[&str] = &[
    "temp",
    "windows_temp",
    "crash_dumps",
    "update_cache",
    "delivery_cache",
    "browser_cache",
    RECYCLE_BIN,
];

#[derive(Serialize, Clone, Debug, PartialEq, Eq)]
pub struct Item {
    pub id: &'static str,
    pub bytes: u64,
}

fn env(name: &str) -> Option<PathBuf> {
    std::env::var_os(name).map(PathBuf::from)
}

fn rel(base: Option<PathBuf>, parts: &[&str]) -> Option<PathBuf> {
    base.map(|b| parts.iter().fold(b, |p, part| p.join(part)))
}

/// Folders (and how old a file must be before it is touched) behind one id; folders that do not exist are dropped.
fn folders(id: &str) -> Vec<(PathBuf, Duration)> {
    let (local, win, data) = (env("LOCALAPPDATA"), env("SystemRoot"), env("ProgramData"));
    let list: Vec<(Option<PathBuf>, Duration)> = match id {
        "temp" => vec![(Some(std::env::temp_dir()), HOUR)],
        "windows_temp" => vec![(rel(win, &["Temp"]), HOUR)],
        "crash_dumps" => vec![
            (rel(local.clone(), &["CrashDumps"]), DAY),
            (rel(local, &[r"Microsoft\Windows\WER\ReportQueue"]), DAY),
            (rel(win, &["Minidump"]), DAY),
            (rel(data.clone(), &[r"Microsoft\Windows\WER\ReportQueue"]), DAY),
            (rel(data, &[r"Microsoft\Windows\WER\ReportArchive"]), DAY),
        ],
        "update_cache" => vec![(rel(win, &[r"SoftwareDistribution\Download"]), DAY)],
        "delivery_cache" => vec![(
            rel(
                win,
                &[r"ServiceProfiles\NetworkService\AppData\Local\Microsoft\Windows\DeliveryOptimization\Cache"],
            ),
            DAY,
        )],
        "browser_cache" => {
            let mut v = vec![];
            for (browser, profile) in [
                (r"Microsoft\Edge\User Data", "Default"),
                (r"Google\Chrome\User Data", "Default"),
                (r"BraveSoftware\Brave-Browser\User Data", "Default"),
            ] {
                for cache in ["Cache", "Code Cache"] {
                    v.push((rel(local.clone(), &[browser, profile, cache]), DAY));
                }
            }
            // Firefox keeps one folder per profile.
            let profiles = rel(local, &[r"Mozilla\Firefox\Profiles"]);
            for p in profiles
                .and_then(|d| std::fs::read_dir(d).ok())
                .into_iter()
                .flatten()
                .flatten()
            {
                v.push((Some(p.path().join("cache2")), DAY));
            }
            v
        }
        _ => vec![],
    };
    list.into_iter()
        .filter_map(|(d, age)| d.filter(|d| d.is_dir()).map(|d| (d, age)))
        .collect()
}

/// How many bytes `clean_dir` would free in `dir`.
pub fn dir_size(dir: &Path, min_age: Duration) -> u64 {
    let now = SystemTime::now();
    std::fs::read_dir(dir)
        .into_iter()
        .flatten()
        .flatten()
        .map(|entry| {
            let Ok(meta) = entry.metadata() else { return 0 };
            let old = meta
                .modified()
                .ok()
                .and_then(|m| now.duration_since(m).ok())
                .is_some_and(|age| age >= min_age);
            match (old, meta.file_type().is_symlink(), meta.is_dir()) {
                (_, true, _) => 0,
                (true, _, false) => meta.len(),
                (_, _, true) => dir_size(&entry.path(), min_age),
                _ => 0,
            }
        })
        .sum()
}

/// What each cleanup item would free right now. Items with nothing to free are left out.
pub fn size(p: &dyn Platform) -> Vec<Item> {
    IDS.iter()
        .map(|&id| Item {
            id,
            bytes: if id == RECYCLE_BIN {
                p.recycle_bin_size().unwrap_or(0)
            } else {
                folders(id).iter().map(|(d, age)| dir_size(d, *age)).sum()
            },
        })
        .filter(|i| i.bytes > 0)
        .collect()
}

/// Deletes the chosen items for good and returns the bytes freed. Unknown ids are an error, not a silent no-op.
pub fn clean(p: &dyn Platform, ids: &[String]) -> Result<u64> {
    if let Some(bad) = ids.iter().find(|i| !IDS.contains(&i.as_str())) {
        return Err(crate::Error::Msg(format!("unknown cleanup item: {bad}")));
    }
    let mut freed = 0;
    for id in ids {
        if id == RECYCLE_BIN {
            let before = p.recycle_bin_size().unwrap_or(0);
            p.empty_recycle_bin()?;
            freed += before;
        } else {
            freed += folders(id).iter().map(|(d, age)| clean_dir(d, *age)).sum::<u64>();
        }
    }
    Ok(freed)
}

/// Deletes what it can inside `dir` and returns the bytes freed. Locked or in-use files are skipped silently;
/// anything touched more recently than `min_age` is left alone so running programs keep their scratch files.
pub fn clean_dir(dir: &Path, min_age: Duration) -> u64 {
    let now = SystemTime::now();
    let mut freed = 0;
    for entry in std::fs::read_dir(dir).into_iter().flatten().flatten() {
        let path = entry.path();
        let Ok(meta) = entry.metadata() else { continue };
        let old = meta
            .modified()
            .ok()
            .and_then(|m| now.duration_since(m).ok())
            .is_some_and(|age| age >= min_age);
        if !old || meta.file_type().is_symlink() {
            continue;
        }
        if meta.is_dir() {
            freed += clean_dir(&path, min_age);
            let _ = std::fs::remove_dir(&path); // only succeeds when empty
        } else if std::fs::remove_file(&path).is_ok() {
            freed += meta.len();
        }
    }
    freed
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn measures_what_it_would_free_and_refuses_unknown_items() {
        let d = tempfile::tempdir().unwrap();
        std::fs::create_dir(d.path().join("sub")).unwrap();
        std::fs::write(d.path().join("sub/a.tmp"), [0u8; 10]).unwrap();
        std::fs::write(d.path().join("b.tmp"), [0u8; 5]).unwrap();
        assert_eq!(dir_size(d.path(), Duration::from_secs(3600)), 0);
        assert_eq!(dir_size(d.path(), Duration::ZERO), 15);
        assert!(clean(&crate::restore::tests::Fake::default(), &["../etc".into()]).is_err());
        assert!(clean(&crate::restore::tests::Fake::default(), &[]).is_ok());
    }

    #[test]
    fn frees_old_files_and_keeps_recent_ones() {
        let d = tempfile::tempdir().unwrap();
        std::fs::create_dir(d.path().join("sub")).unwrap();
        std::fs::write(d.path().join("sub/a.tmp"), [0u8; 10]).unwrap();
        std::fs::write(d.path().join("b.tmp"), [0u8; 5]).unwrap();
        assert_eq!(clean_dir(d.path(), Duration::from_secs(3600)), 0); // everything is fresh
        assert!(d.path().join("b.tmp").exists());
        assert_eq!(clean_dir(d.path(), Duration::ZERO), 15);
        assert!(!d.path().join("sub").exists());
    }
}
