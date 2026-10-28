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

#[derive(Serialize, Deserialize, Clone, PartialEq, Eq, Debug)]
#[serde(tag = "type", content = "data")]
pub enum RegValue {
    Dword(u32),
    Qword(u64),
    String(String),
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
    /// ponytail: WMI AdapterRAM is a u32 and caps at 4 GB; read qwMemorySize from the
    /// display-class registry key when exact VRAM matters (GPU profiles phase).
    pub vram_bytes: Option<u64>,
}

pub trait Platform: Send + Sync {
    fn gpus(&self) -> Result<Vec<Gpu>>;
    fn reg_get(&self, key: &RegKey) -> Result<Option<RegValue>>;
    fn reg_set(&self, key: &RegKey, value: &RegValue) -> Result<()>;
    fn reg_delete(&self, key: &RegKey) -> Result<()>;
    /// Creates an OS-level restore point. Must fail loudly: restore is mandatory before any change.
    fn create_restore_point(&self, label: &str) -> Result<()>;
    /// Opens the OS's own restore UI (full-system rollback, needs a reboot).
    fn open_system_restore(&self) -> Result<()>;
}

pub fn current() -> Box<dyn Platform> {
    #[cfg(windows)]
    return Box::new(windows::Windows);
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
