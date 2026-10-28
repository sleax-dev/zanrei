use std::path::Path;
use std::time::{Duration, SystemTime};

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
