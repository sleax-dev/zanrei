//! A small activity log: a ring buffer for the UI plus a rotating file so problems can be shared
//! after the fact. Everything Zanrei changes, and everything that fails, ends up here.

use serde::{Deserialize, Serialize};
use std::{
    collections::VecDeque,
    fs,
    io::Write,
    path::PathBuf,
    sync::{Mutex, MutexGuard},
    time::{SystemTime, UNIX_EPOCH},
};

const KEEP_IN_MEMORY: usize = 1000;
const ROTATE_AT_BYTES: u64 = 1024 * 1024;
const FILE: &str = "zanrei.log";

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Level {
    Info,
    Warn,
    Error,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Entry {
    /// Unix milliseconds.
    pub ts: u64,
    pub level: Level,
    pub source: String,
    pub message: String,
}

pub struct Logger {
    dir: PathBuf,
    ring: Mutex<VecDeque<Entry>>,
}

fn lock<T>(m: &Mutex<T>) -> MutexGuard<'_, T> {
    m.lock().unwrap_or_else(|e| e.into_inner())
}

impl Logger {
    /// Reloads the tail of the previous session's file so the UI shows history after a restart.
    pub fn new(dir: PathBuf) -> Self {
        let past: VecDeque<Entry> = fs::read_to_string(dir.join(FILE))
            .unwrap_or_default()
            .lines()
            .filter_map(|l| serde_json::from_str(l).ok())
            .collect::<Vec<Entry>>()
            .into_iter()
            .rev()
            .take(KEEP_IN_MEMORY)
            .rev()
            .collect();
        Self {
            dir,
            ring: Mutex::new(past),
        }
    }

    pub fn push(&self, level: Level, source: &str, message: &str) -> Entry {
        let ts = SystemTime::now()
            .duration_since(UNIX_EPOCH)
            .unwrap_or_default()
            .as_millis() as u64;
        let entry = Entry {
            ts,
            level,
            source: source.into(),
            message: message.into(),
        };
        {
            let mut ring = lock(&self.ring);
            if ring.len() == KEEP_IN_MEMORY {
                ring.pop_front();
            }
            ring.push_back(entry.clone());
        }
        self.append(&entry);
        entry
    }

    /// Logging must never be the thing that breaks the app: every file error is swallowed.
    fn append(&self, entry: &Entry) {
        let _ = fs::create_dir_all(&self.dir);
        let path = self.dir.join(FILE);
        if fs::metadata(&path).is_ok_and(|m| m.len() > ROTATE_AT_BYTES) {
            let _ = fs::rename(&path, self.dir.join("zanrei.1.log"));
        }
        if let (Ok(line), Ok(mut f)) = (
            serde_json::to_string(entry),
            fs::OpenOptions::new().create(true).append(true).open(&path),
        ) {
            let _ = writeln!(f, "{line}");
        }
    }

    pub fn entries(&self) -> Vec<Entry> {
        lock(&self.ring).iter().cloned().collect()
    }

    pub fn clear(&self) {
        lock(&self.ring).clear();
        let _ = fs::remove_file(self.dir.join(FILE));
        let _ = fs::remove_file(self.dir.join("zanrei.1.log"));
    }

    pub fn dir(&self) -> &std::path::Path {
        &self.dir
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn keeps_history_across_restarts_and_clears() {
        let d = tempfile::tempdir().unwrap();
        let log = Logger::new(d.path().into());
        log.push(Level::Info, "test", "first");
        log.push(Level::Error, "test", "second");
        let again = Logger::new(d.path().into());
        let msgs: Vec<_> = again.entries().into_iter().map(|e| e.message).collect();
        assert_eq!(msgs, ["first", "second"]);
        again.clear();
        assert!(Logger::new(d.path().into()).entries().is_empty());
    }

    #[test]
    fn ring_is_bounded() {
        let d = tempfile::tempdir().unwrap();
        let log = Logger::new(d.path().into());
        for i in 0..KEEP_IN_MEMORY + 5 {
            log.push(Level::Info, "t", &i.to_string());
        }
        let all = log.entries();
        assert_eq!(all.len(), KEEP_IN_MEMORY);
        assert_eq!(all[0].message, "5");
    }
}
