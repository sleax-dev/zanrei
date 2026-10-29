use crate::Result;
use serde::{Deserialize, Serialize};

#[cfg(not(windows))]
mod other;
#[cfg(windows)]
mod windows;

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Hive {
    Hklm,
    Hkcu,
}

#[derive(Serialize, Deserialize, Clone, PartialEq, Eq, Debug)]
pub struct RegKey {
    pub hive: Hive,
    pub path: String,
    pub name: String,
}

impl RegKey {
    pub fn new(hive: Hive, path: &str, name: &str) -> Self {
        Self {
            hive,
            path: path.into(),
            name: name.into(),
        }
    }
}

#[derive(Serialize, Deserialize, Clone, PartialEq, Eq, Debug)]
#[serde(tag = "type", content = "data")]
pub enum RegValue {
    Dword(u32),
    Qword(u64),
    String(String),
    Binary(Vec<u8>),
}

#[derive(Serialize, Deserialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Vendor {
    Nvidia,
    Amd,
    Intel,
    Other,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Gpu {
    pub name: String,
    pub vendor: Vendor,
    pub driver_version: String,
    /// Unix seconds of the installed driver's date, when Windows reports it.
    pub driver_date_unix: Option<i64>,
    /// ponytail: WMI AdapterRAM is a u32 and caps at 4 GB; read qwMemorySize from the
    /// display-class registry key when exact VRAM matters.
    pub vram_bytes: Option<u64>,
}

/// Everything that touches the operating system. Core logic only ever talks to this trait,
/// so a port to another OS is one more implementation.
pub trait Platform: Send + Sync {
    fn gpus(&self) -> Result<Vec<Gpu>>;
    fn reg_get(&self, key: &RegKey) -> Result<Option<RegValue>>;
    fn reg_set(&self, key: &RegKey, value: &RegValue) -> Result<()>;
    fn reg_delete(&self, key: &RegKey) -> Result<()>;
    fn reg_subkeys(&self, hive: Hive, path: &str) -> Result<Vec<String>>;
    /// Names of the values directly under a key (empty when the key does not exist).
    fn reg_value_names(&self, hive: Hive, path: &str) -> Result<Vec<String>>;
    /// Creates an OS-level restore point and returns its sequence number when the OS reports one.
    /// Must fail loudly: restore is mandatory before any change.
    fn create_restore_point(&self, label: &str) -> Result<Option<u32>>;
    /// Deletes OS restore points by the sequence numbers `create_restore_point` returned, in one go (starting the
    /// tooling is slow). Returns the ones that could not be removed, for instance because Windows already dropped them.
    fn remove_restore_points(&self, sequences: &[u32]) -> Result<Vec<u32>>;
    /// Opens the OS's own restore UI (full-system rollback, needs a reboot).
    fn open_system_restore(&self) -> Result<()>;
    /// Runs a program without a shell or a visible window. Err on a non-zero exit code.
    fn run(&self, program: &str, args: &[&str]) -> Result<String>;
    /// `None` = the scheduled task does not exist.
    fn task_enabled(&self, path: &str) -> Result<Option<bool>>;
    fn task_set_enabled(&self, path: &str, enabled: bool) -> Result<()>;
    fn edge_installed(&self) -> bool;
    /// Uninstalls Edge. Nothing here can put it back: callers must say so before they ask.
    fn remove_edge(&self) -> Result<()>;
    /// Which of these packages are installed (any user).
    fn installed_apps(&self, names: &[&str]) -> Result<Vec<String>>;
    fn remove_apps(&self, names: &[&str]) -> Result<()>;
    /// Bytes held by the Recycle Bin of every drive.
    fn recycle_bin_size(&self) -> Result<u64>;
    fn empty_recycle_bin(&self) -> Result<()>;
}

pub fn current() -> Box<dyn Platform> {
    #[cfg(windows)]
    return Box::new(windows::Windows::default());
    #[cfg(not(windows))]
    return Box::new(other::Unsupported);
}

pub fn vendor_from_pnp(pnp_device_id: &str) -> Vendor {
    let id = pnp_device_id.to_ascii_uppercase();
    if id.contains("VEN_10DE") {
        Vendor::Nvidia
    } else if id.contains("VEN_1002") || id.contains("VEN_1022") {
        Vendor::Amd
    } else if id.contains("VEN_8086") {
        Vendor::Intel
    } else {
        Vendor::Other
    }
}

/// PowerShell 5.1 serialises dates as `/Date(1650000000000)/`, optionally with a UTC offset.
#[cfg_attr(not(windows), allow(dead_code))]
pub(crate) fn parse_ps_date(s: &str) -> Option<i64> {
    let ms: i64 = s.split(['(', ')']).nth(1)?.split(['+', '-']).next()?.parse().ok()?;
    Some(ms / 1000)
}

#[cfg(test)]
mod tests {
    use super::parse_ps_date;

    #[test]
    fn ps_dates() {
        assert_eq!(parse_ps_date("/Date(1650000000000)/"), Some(1_650_000_000));
        assert_eq!(parse_ps_date("\\/Date(1650000000000+0300)\\/"), Some(1_650_000_000));
        assert_eq!(parse_ps_date("garbage"), None);
    }
}
