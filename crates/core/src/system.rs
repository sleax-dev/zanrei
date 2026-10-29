use crate::platform::{Gpu, Hive, Platform, RegKey, RegValue, Vendor};
use serde::Serialize;
use sysinfo::{DiskKind, Disks, System};

#[derive(Serialize, Clone, Debug)]
pub struct SystemInfo {
    pub os_name: String,
    pub os_version: String,
    pub os_build: String,
    pub is_windows_11: bool,
    /// "Pro", "Home", ... (empty when unknown).
    pub edition: String,
    /// Feature update such as "24H2" (empty when unknown).
    pub display_version: String,
    /// Set when this is a modified Windows that leaves its name in the OEM information.
    pub flavor: Option<Flavor>,
    pub cpu_name: String,
    pub physical_cores: usize,
    pub logical_cores: usize,
    pub ram_bytes: u64,
    pub gpus: Vec<Gpu>,
    pub disks: Vec<DiskInfo>,
    pub tier: Tier,
}

/// A modified Windows. Only projects that write an identifiable OEM entry can be told apart reliably; a hand-made
/// ISO leaves nothing to recognise, so "not detected" never means "stock Windows".
#[derive(Serialize, Clone, Debug, PartialEq, Eq)]
pub struct Flavor {
    /// Stable id for the UI to pick text and styling with.
    pub id: &'static str,
    pub name: &'static str,
    pub version: Option<String>,
}

const OEM: &str = r"SOFTWARE\Microsoft\Windows\CurrentVersion\OEMInformation";
const NT: &str = r"SOFTWARE\Microsoft\Windows NT\CurrentVersion";

fn text(p: &dyn Platform, path: &str, name: &str) -> String {
    match p.reg_get(&RegKey::new(Hive::Hklm, path, name)) {
        Ok(Some(RegValue::String(v))) => v.trim().to_string(),
        _ => String::new(),
    }
}

/// AtlasOS writes `Manufacturer = "Atlas Team"` and `Model = "Atlas Playbook v0.5.0"` (Atlas-OS/Atlas,
/// `config-oem-information.yml`); ReviOS writes `Manufacturer = "Revision"` (meetrevision/playbook, `oem-info.yml`).
pub fn flavor(p: &dyn Platform) -> Option<Flavor> {
    let maker = text(p, OEM, "Manufacturer");
    let model = text(p, OEM, "Model");
    if maker == "Atlas Team" || model.starts_with("Atlas Playbook") {
        // A playbook built from source and never stamped says "AtlasVersionUndefined"; that is not a version.
        let version = model
            .strip_prefix("Atlas Playbook")
            .map(str::trim)
            .filter(|v| v.starts_with('v') || v.starts_with(|c: char| c.is_ascii_digit()))
            .map(str::to_string);
        return Some(Flavor {
            id: "atlas",
            name: "AtlasOS",
            version,
        });
    }
    (maker == "Revision").then_some(Flavor {
        id: "revios",
        name: "ReviOS",
        version: None,
    })
}

fn edition(p: &dyn Platform) -> String {
    match text(p, NT, "EditionID").as_str() {
        "Core" | "CoreSingleLanguage" | "CoreN" => "Home".into(),
        "Professional" | "ProfessionalN" => "Pro".into(),
        "ProfessionalWorkstation" => "Pro for Workstations".into(),
        "Enterprise" | "EnterpriseS" => "Enterprise".into(),
        "Education" | "ProfessionalEducation" => "Education".into(),
        other => other.into(),
    }
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

/// Windows build number (e.g. 22631), 0 when unknown.
pub fn os_build() -> u32 {
    System::kernel_version().and_then(|v| v.parse().ok()).unwrap_or(0)
}

pub fn detect(platform: &dyn Platform) -> SystemInfo {
    let mut sys = System::new();
    sys.refresh_memory();
    sys.refresh_cpu_all();
    let cpu_name = sys
        .cpus()
        .first()
        .map(|c| c.brand().trim().to_string())
        .unwrap_or_default();
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
        edition: edition(platform),
        display_version: text(platform, NT, "DisplayVersion"),
        flavor: flavor(platform),
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
    use crate::restore::tests::Fake;

    fn oem(p: &Fake, name: &str, value: &str) {
        p.reg_set(&RegKey::new(Hive::Hklm, OEM, name), &RegValue::String(value.into()))
            .unwrap();
    }

    #[test]
    fn recognises_atlas_by_its_oem_entries() {
        let p = Fake::default();
        assert_eq!(flavor(&p), None);
        oem(&p, "Manufacturer", "Atlas Team");
        oem(&p, "Model", "Atlas Playbook v0.5.0");
        let f = flavor(&p).unwrap();
        assert_eq!((f.id, f.version.as_deref()), ("atlas", Some("v0.5.0")));
    }

    #[test]
    fn an_unstamped_atlas_build_has_no_version_and_other_makers_are_ignored() {
        let p = Fake::default();
        oem(&p, "Model", "Atlas Playbook AtlasVersionUndefined");
        assert_eq!(flavor(&p).unwrap().version, None);
        let p = Fake::default();
        oem(&p, "Manufacturer", "Dell Inc.");
        assert_eq!(flavor(&p), None);
        oem(&p, "Manufacturer", "Revision");
        assert_eq!(flavor(&p).unwrap().id, "revios");
    }

    #[test]
    fn editions_get_plain_names() {
        let p = Fake::default();
        p.reg_set(
            &RegKey::new(Hive::Hklm, NT, "EditionID"),
            &RegValue::String("Professional".into()),
        )
        .unwrap();
        assert_eq!(edition(&p), "Pro");
        assert_eq!(edition(&Fake::default()), "");
    }

    fn gpu(vendor: Vendor) -> Vec<Gpu> {
        vec![Gpu {
            name: "x".into(),
            vendor,
            driver_version: String::new(),
            driver_date_unix: None,
            vram_bytes: None,
        }]
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
