//! Power plans, restarts and the shell: small wrappers over system tools, all through `Platform::run`.

use crate::platform::Platform;
use crate::{Error, Result};

pub const BALANCED: &str = "381b4222-f694-41f0-9685-ff5bb260df2e";
pub const HIGH_PERFORMANCE: &str = "8c5e7fda-e8bf-4a96-9a85-a6e23a8c635c";

/// First GUID in the text. `powercfg` labels are localised, the GUID is not.
pub fn find_guid(text: &str) -> Option<String> {
    let b = text.as_bytes();
    let shape = [8, 4, 4, 4, 12];
    (0..b.len()).find_map(|start| {
        let mut i = start;
        for (n, len) in shape.iter().enumerate() {
            if n > 0 {
                if b.get(i) != Some(&b'-') {
                    return None;
                }
                i += 1;
            }
            let part = b.get(i..i + len)?;
            if !part.iter().all(u8::is_ascii_hexdigit) {
                return None;
            }
            i += len;
        }
        Some(text[start..i].to_ascii_lowercase())
    })
}

pub fn active_scheme(p: &dyn Platform) -> Result<String> {
    let out = p.run("powercfg", &["/getactivescheme"])?;
    find_guid(&out).ok_or_else(|| Error::Msg("could not read the active power plan".into()))
}

pub fn set_scheme(p: &dyn Platform, guid: &str) -> Result<()> {
    p.run("powercfg", &["/setactive", guid]).map(|_| ())
}

/// Windows shows its own countdown; `cancel_restart` aborts it.
pub fn restart(p: &dyn Platform, seconds: u32) -> Result<()> {
    let secs = seconds.to_string();
    p.run(
        "shutdown",
        &["/r", "/t", &secs, "/c", "Restarting to apply Zanrei changes"],
    )
    .map(|_| ())
}

pub fn cancel_restart(p: &dyn Platform) -> Result<()> {
    p.run("shutdown", &["/a"]).map(|_| ())
}

/// Windows restarts the shell by itself after it is killed.
pub fn restart_explorer(p: &dyn Platform) -> Result<()> {
    p.run("taskkill", &["/f", "/im", "explorer.exe"]).map(|_| ())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn guid_from_localised_output() {
        assert_eq!(
            find_guid("Güç Düzeni GUID'si: 8C5E7FDA-E8BF-4A96-9A85-A6E23A8C635C  (Yüksek performans)").as_deref(),
            Some(HIGH_PERFORMANCE)
        );
        assert_eq!(find_guid("no guid here 1234-5678"), None);
    }
}
