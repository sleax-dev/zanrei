//! Programs that start with Windows: the Run keys and the two Startup folders. Whether an entry runs is the flag
//! Windows keeps under `Explorer\StartupApproved` (the one Task Manager flips), so switching an entry off never
//! deletes it and the change goes through the snapshot journal like every other.

use crate::platform::{Hive, Platform, RegKey, RegValue};
use crate::restore::Store;
use crate::{Error, Result};
use serde::Serialize;
use std::path::PathBuf;
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Serialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Scope {
    User,
    AllUsers,
}

#[derive(Serialize, Clone, Debug, PartialEq, Eq)]
pub struct StartupItem {
    /// `<source>:<name>`; stable across calls, parsed back by `set`.
    pub id: String,
    pub name: String,
    pub command: String,
    pub scope: Scope,
    pub enabled: bool,
    /// Part of Windows or its security stack: switching it off is allowed but deserves a second thought.
    pub system: bool,
}

struct Source {
    id: &'static str,
    hive: Hive,
    scope: Scope,
    /// Registry key holding the entries, or the folder holding the shortcuts.
    location: Location,
    /// `StartupApproved` subkey that carries the enabled flag.
    approved: &'static str,
}

enum Location {
    Run(&'static str),
    Folder(fn() -> Option<PathBuf>),
}

const APPROVED: &str = r"Software\Microsoft\Windows\CurrentVersion\Explorer\StartupApproved";

fn user_folder() -> Option<PathBuf> {
    std::env::var_os("APPDATA").map(|d| PathBuf::from(d).join(r"Microsoft\Windows\Start Menu\Programs\Startup"))
}

fn common_folder() -> Option<PathBuf> {
    std::env::var_os("ProgramData").map(|d| PathBuf::from(d).join(r"Microsoft\Windows\Start Menu\Programs\StartUp"))
}

const SOURCES: &[Source] = &[
    Source {
        id: "user",
        hive: Hive::Hkcu,
        scope: Scope::User,
        location: Location::Run(r"Software\Microsoft\Windows\CurrentVersion\Run"),
        approved: "Run",
    },
    Source {
        id: "machine",
        hive: Hive::Hklm,
        scope: Scope::AllUsers,
        location: Location::Run(r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run"),
        approved: "Run",
    },
    Source {
        id: "machine32",
        hive: Hive::Hklm,
        scope: Scope::AllUsers,
        location: Location::Run(r"SOFTWARE\WOW6432Node\Microsoft\Windows\CurrentVersion\Run"),
        approved: "Run32",
    },
    Source {
        id: "user_folder",
        hive: Hive::Hkcu,
        scope: Scope::User,
        location: Location::Folder(user_folder),
        approved: "StartupFolder",
    },
    Source {
        id: "common_folder",
        hive: Hive::Hklm,
        scope: Scope::AllUsers,
        location: Location::Folder(common_folder),
        approved: "StartupFolder",
    },
];

impl Source {
    fn flag_key(&self, name: &str) -> RegKey {
        // The HKLM copy lives under the same relative path as the per-user one.
        RegKey::new(self.hive, &format!(r"{APPROVED}\{}", self.approved), name)
    }

    /// (name, command) of every entry. Shortcuts show their file name; resolving the target needs COM.
    fn entries(&self, p: &dyn Platform) -> Vec<(String, String)> {
        match &self.location {
            Location::Run(path) => p
                .reg_value_names(self.hive, path)
                .unwrap_or_default()
                .into_iter()
                .filter(|n| !n.is_empty())
                .filter_map(|n| match p.reg_get(&RegKey::new(self.hive, path, &n)) {
                    Ok(Some(RegValue::String(c))) => Some((n, c)),
                    _ => None,
                })
                .collect(),
            Location::Folder(dir) => dir()
                .and_then(|d| std::fs::read_dir(d).ok())
                .into_iter()
                .flatten()
                .flatten()
                .filter(|e| e.path().is_file())
                .map(|e| e.file_name().to_string_lossy().into_owned())
                .filter(|n| !n.eq_ignore_ascii_case("desktop.ini"))
                .map(|n| (n.clone(), n))
                .collect(),
        }
    }

    /// The per-user copy of a machine-wide entry's flag, which Task Manager writes when a non-admin switches it off.
    fn user_flag_key(&self, name: &str) -> Option<RegKey> {
        (self.hive == Hive::Hklm).then(|| RegKey::new(Hive::Hkcu, &format!(r"{APPROVED}\{}", self.approved), name))
    }

    /// First byte of the flag: even = enabled (02, 06), odd = disabled (03). No flag = enabled.
    fn enabled(&self, p: &dyn Platform, name: &str) -> bool {
        let off = |key: &RegKey| matches!(p.reg_get(key), Ok(Some(RegValue::Binary(b))) if b.first().is_some_and(|b| b % 2 == 1));
        !(off(&self.flag_key(name)) || self.user_flag_key(name).is_some_and(|k| off(&k)))
    }
}

/// Seconds since 1601, in the 100 ns units of a Windows FILETIME.
fn filetime_now() -> u64 {
    (SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .unwrap_or_default()
        .as_secs()
        + 11_644_473_600)
        * 10_000_000
}

fn is_system(command: &str) -> bool {
    let c = command.to_ascii_lowercase();
    [
        "\\windows\\system32",
        "\\windows defender",
        "securityhealth",
        "\\windowsapps\\",
    ]
    .iter()
    .any(|w| c.contains(w))
}

pub fn list(p: &dyn Platform) -> Vec<StartupItem> {
    let mut items: Vec<StartupItem> = SOURCES
        .iter()
        .flat_map(|s| {
            s.entries(p).into_iter().map(|(name, command)| StartupItem {
                id: format!("{}:{name}", s.id),
                enabled: s.enabled(p, &name),
                system: is_system(&command),
                scope: s.scope,
                name,
                command,
            })
        })
        .collect();
    items.sort_by_key(|i| i.name.to_ascii_lowercase());
    items
}

/// Switches one entry on or off inside snapshot `sid`. The entry must exist, so a made-up id cannot write anywhere.
pub fn set(store: &Store, p: &dyn Platform, sid: &str, id: &str, enabled: bool) -> Result<()> {
    let (source, name) = id
        .split_once(':')
        .ok_or_else(|| Error::Msg("unknown startup entry".into()))?;
    let src = SOURCES
        .iter()
        .find(|s| s.id == source)
        .ok_or_else(|| Error::Msg("unknown startup entry".into()))?;
    if !src.entries(p).iter().any(|(n, _)| n == name) {
        return Err(Error::Msg("that startup entry no longer exists".into()));
    }
    let mut flag = vec![if enabled { 0x02 } else { 0x03 }, 0, 0, 0];
    flag.extend(if enabled {
        [0u8; 8]
    } else {
        filetime_now().to_le_bytes()
    });
    let flag = RegValue::Binary(flag);
    store.reg_set(p, sid, &src.flag_key(name), &flag)?;
    // Keep both copies in step, but never create a per-user flag that was not there.
    match src.user_flag_key(name) {
        Some(key) if p.reg_get(&key)?.is_some() => store.reg_set(p, sid, &key, &flag),
        _ => Ok(()),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::restore::tests::Fake;

    #[test]
    fn switching_an_entry_off_keeps_it_and_rolls_back() {
        let dir = tempfile::tempdir().unwrap();
        let (store, p) = (Store::new(dir.path().into()), Fake::default());
        let run = RegKey::new(Hive::Hkcu, r"Software\Microsoft\Windows\CurrentVersion\Run", "Discord");
        p.reg_set(
            &run,
            &RegValue::String(r"C:\Users\me\AppData\Local\Discord\Update.exe --processStart".into()),
        )
        .unwrap();
        let sec = RegKey::new(
            Hive::Hklm,
            r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run",
            "SecurityHealth",
        );
        p.reg_set(
            &sec,
            &RegValue::String(r"C:\Windows\system32\SecurityHealthSystray.exe".into()),
        )
        .unwrap();

        let items = list(&p);
        assert_eq!(items.len(), 2);
        assert!(items.iter().all(|i| i.enabled));
        assert!(items.iter().find(|i| i.name == "SecurityHealth").unwrap().system);
        assert!(!items.iter().find(|i| i.name == "Discord").unwrap().system);

        let sid = store.create(&p, "t").unwrap().id;
        set(&store, &p, &sid, "user:Discord", false).unwrap();
        let after = list(&p);
        assert!(!after.iter().find(|i| i.id == "user:Discord").unwrap().enabled);
        assert!(after.iter().find(|i| i.id == "machine:SecurityHealth").unwrap().enabled);
        // the entry itself is untouched
        assert!(p.reg_get(&run).unwrap().is_some());

        set(&store, &p, &sid, "user:Discord", true).unwrap();
        assert!(list(&p).iter().all(|i| i.enabled));
        set(&store, &p, &sid, "user:Discord", false).unwrap();
        store.rollback(&p, &sid).unwrap();
        assert!(list(&p).iter().all(|i| i.enabled));
    }

    #[test]
    fn a_per_user_flag_disables_a_machine_entry_and_is_cleared_with_it() {
        let dir = tempfile::tempdir().unwrap();
        let (store, p) = (Store::new(dir.path().into()), Fake::default());
        let run = RegKey::new(Hive::Hklm, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Run", "Updater");
        p.reg_set(&run, &RegValue::String(r"C:\Program Files\App\up.exe".into()))
            .unwrap();
        let user_flag = RegKey::new(Hive::Hkcu, &format!(r"{APPROVED}\Run"), "Updater");
        p.reg_set(&user_flag, &RegValue::Binary(vec![3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
            .unwrap();
        assert!(!list(&p)[0].enabled);

        let sid = store.create(&p, "t").unwrap().id;
        set(&store, &p, &sid, "machine:Updater", true).unwrap();
        assert!(list(&p)[0].enabled);
        assert_eq!(
            p.reg_get(&user_flag).unwrap(),
            Some(RegValue::Binary(vec![2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))
        );
        // switching off writes the machine flag; no per-user flag appears where there was none
        p.reg_delete(&user_flag).unwrap();
        set(&store, &p, &sid, "machine:Updater", false).unwrap();
        assert!(!list(&p)[0].enabled);
        assert_eq!(p.reg_get(&user_flag).unwrap(), None);
    }

    #[test]
    fn rejects_unknown_ids() {
        let dir = tempfile::tempdir().unwrap();
        let (store, p) = (Store::new(dir.path().into()), Fake::default());
        let sid = store.create(&p, "t").unwrap().id;
        for id in ["nope", "bogus:x", "user:Missing"] {
            assert!(set(&store, &p, &sid, id, false).is_err(), "{id}");
        }
    }
}
