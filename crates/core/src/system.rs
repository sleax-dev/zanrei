use crate::platform::{Gpu, Platform, Vendor};
use serde::Serialize;
use sysinfo::{DiskKind, Disks, System};

#[derive(Serialize, Clone, Debug)]
pub struct SystemInfo {
    pub os_name: String,
    pub os_version: String,
    pub os_build: String,
    pub is_windows_11: bool,
    pub cpu_name: String,
    pub physical_cores: usize,
    pub logical_cores: usize,
    pub ram_bytes: u64,
    pub gpus: Vec<Gpu>,
    pub disks: Vec<DiskInfo>,
    pub tier: Tier,
}

#[derive(Serialize, Clone, Debug)]
pub struct DiskInfo {
    pub mount: String,
    pub kind: String,
    pub total_bytes: u64,
    pub free_bytes: u64,
}

#[derive(Serialize, Clone, Copy, PartialEq, Eq, Debug)]
pub enum Tier {
    Legacy,
    Mainstream,
    High,
}

/// ponytail: naive thresholds. Tune against real hardware reports once the tweak/game phases need finer buckets.
pub fn tier(ram_bytes: u64, logical_cores: usize, has_ssd: bool, gpus: &[Gpu]) -> Tier {
    let gb = ram_bytes / (1 << 30);
    let discrete = gpus.iter().any(|g| matches!(g.vendor, Vendor::Nvidia | Vendor::Amd));
    if gb < 6 || logical_cores <= 2 || (!has_ssd && gb < 8) {
        Tier::Legacy
    } else if gb >= 16 && logical_cores >= 8 && discrete {
        Tier::High
    } else {
        Tier::Mainstream
    }
}

pub fn detect(platform: &dyn Platform) -> SystemInfo {
    let mut sys = System::new();
    sys.refresh_memory();
    sys.refresh_cpu_all();
    let cpu_name = sys.cpus().first().map(|c| c.brand().trim().to_string()).unwrap_or_default();
    let logical_cores = sys.cpus().len();
    let physical_cores = System::physical_core_count().unwrap_or(logical_cores);

    let disks: Vec<DiskInfo> = Disks::new_with_refreshed_list()
        .iter()
        .filter(|d| !d.is_removable())
        .map(|d| DiskInfo {
            mount: d.mount_point().to_string_lossy().into_owned(),
            kind: match d.kind() {
                DiskKind::SSD => "SSD",
                DiskKind::HDD => "HDD",
                _ => "Unknown",
            }
            .into(),
            total_bytes: d.total_space(),
            free_bytes: d.available_space(),
        })
        .collect();

    // A failed GPU query must not block setup: report "no GPU found" and let the UI say so.
    let gpus = platform.gpus().unwrap_or_default();
    let has_ssd = disks.iter().any(|d| d.kind == "SSD");
    let os_build = System::kernel_version().unwrap_or_default();

    SystemInfo {
        os_name: System::name().unwrap_or_default(),
        os_version: System::os_version().unwrap_or_default(),
        is_windows_11: os_build.parse::<u32>().is_ok_and(|b| b >= 22000),
        os_build,
        cpu_name,
        physical_cores,
        logical_cores,
        ram_bytes: sys.total_memory(),
        tier: tier(sys.total_memory(), logical_cores, has_ssd, &gpus),
        gpus,
        disks,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn gpu(vendor: Vendor) -> Vec<Gpu> {
        vec![Gpu { name: "x".into(), vendor, driver_version: String::new(), vram_bytes: None }]
    }

    #[test]
    fn tiers() {
        let gb = 1u64 << 30;
        assert_eq!(tier(4 * gb, 4, true, &[]), Tier::Legacy);
        assert_eq!(tier(16 * gb, 2, true, &gpu(Vendor::Nvidia)), Tier::Legacy);
        assert_eq!(tier(8 * gb, 4, false, &[]), Tier::Mainstream);
        assert_eq!(tier(6 * gb, 4, false, &[]), Tier::Legacy);
        assert_eq!(tier(16 * gb, 8, true, &gpu(Vendor::Amd)), Tier::High);
        assert_eq!(tier(16 * gb, 8, true, &gpu(Vendor::Intel)), Tier::Mainstream);
    }
}
