use super::*;
use crate::Error;

/// Placeholder for non-Windows hosts: detection works (sysinfo), anything that changes the system does not.
pub struct Unsupported;

impl Platform for Unsupported {
    fn gpus(&self) -> Result<Vec<Gpu>> {
        Ok(vec![])
    }
    fn reg_get(&self, _: &RegKey) -> Result<Option<RegValue>> {
        Err(Error::Unsupported)
    }
    fn reg_set(&self, _: &RegKey, _: &RegValue) -> Result<()> {
        Err(Error::Unsupported)
    }
    fn reg_delete(&self, _: &RegKey) -> Result<()> {
        Err(Error::Unsupported)
    }
    fn reg_subkeys(&self, _: Hive, _: &str) -> Result<Vec<String>> {
        Ok(vec![])
    }
    fn create_restore_point(&self, _: &str) -> Result<()> {
        Err(Error::Unsupported)
    }
    fn open_system_restore(&self) -> Result<()> {
        Err(Error::Unsupported)
    }
    fn run(&self, _: &str, _: &[&str]) -> Result<String> {
        Err(Error::Unsupported)
    }
    fn task_enabled(&self, _: &str) -> Result<Option<bool>> {
        Err(Error::Unsupported)
    }
    fn task_set_enabled(&self, _: &str, _: bool) -> Result<()> {
        Err(Error::Unsupported)
    }
    fn edge_installed(&self) -> bool {
        false
    }
    fn remove_edge(&self) -> Result<()> {
        Err(Error::Unsupported)
    }
    fn reinstall_edge(&self) -> Result<()> {
        Err(Error::Unsupported)
    }
    fn installed_apps(&self, _: &[&str]) -> Result<Vec<String>> {
        Ok(vec![])
    }
    fn remove_apps(&self, _: &[&str]) -> Result<()> {
        Err(Error::Unsupported)
    }
}
