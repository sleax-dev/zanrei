use super::*;

/// Placeholder for non-Windows hosts: detection works (sysinfo), anything that changes the system does not.
pub struct Unsupported;

impl Platform for Unsupported {
    fn gpus(&self) -> Result<Vec<Gpu>> {
        Ok(vec![])
    }
    fn reg_get(&self, _: &RegKey) -> Result<Option<RegValue>> {
        Err(crate::Error::Unsupported)
    }
    fn reg_set(&self, _: &RegKey, _: &RegValue) -> Result<()> {
        Err(crate::Error::Unsupported)
    }
    fn reg_delete(&self, _: &RegKey) -> Result<()> {
        Err(crate::Error::Unsupported)
    }
    fn create_restore_point(&self, _: &str) -> Result<()> {
        Err(crate::Error::Unsupported)
    }
    fn open_system_restore(&self) -> Result<()> {
        Err(crate::Error::Unsupported)
    }
}
