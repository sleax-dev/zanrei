use crate::Result;
use serde::{Deserialize, Serialize};
use std::path::Path;

/// How much Zanrei may do without asking. Risk tiers themselves arrive with the tweak catalog.
/// - Manual: nothing is applied unless the user picks it.
/// - Recommended: safe tweaks are suggested, the user confirms.
/// - Auto: safe + medium tweaks are applied automatically, always behind a fresh snapshot.
#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, Eq, Debug, Default)]
pub enum Mode {
    Manual,
    #[default]
    Recommended,
    Auto,
}

#[derive(Serialize, Deserialize, Clone, Debug, Default, PartialEq)]
#[serde(default)]
pub struct Settings {
    pub language: Option<String>,
    pub setup_done: bool,
    pub mode: Mode,
}

const FILE: &str = "settings.json";

pub fn load(dir: &Path) -> Settings {
    // A missing or corrupt file means first run, not a crash.
    std::fs::read(dir.join(FILE))
        .ok()
        .and_then(|b| serde_json::from_slice(&b).ok())
        .unwrap_or_default()
}

pub fn save(dir: &Path, s: &Settings) -> Result<()> {
    std::fs::create_dir_all(dir)?;
    let tmp = dir.join("settings.json.tmp");
    std::fs::write(&tmp, serde_json::to_vec_pretty(s)?)?;
    std::fs::rename(tmp, dir.join(FILE))?; // atomic replace: never a half-written file
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn roundtrip_and_corrupt() {
        let d = tempfile::tempdir().unwrap();
        assert_eq!(load(d.path()), Settings::default());
        let s = Settings {
            language: Some("tr".into()),
            setup_done: true,
            mode: Mode::Auto,
        };
        save(d.path(), &s).unwrap();
        assert_eq!(load(d.path()), s);
        std::fs::write(d.path().join(FILE), b"{oops").unwrap();
        assert_eq!(load(d.path()), Settings::default());
    }
}
