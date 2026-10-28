use super::*;
use crate::Error;
use serde::Deserialize;
use std::os::windows::process::CommandExt;
use std::path::PathBuf;
use std::process::Command;
use winreg::{RegKey as WinKey, enums::*};

const CREATE_NO_WINDOW: u32 = 0x0800_0000;

pub struct Windows;

/// Zanrei ships one 32-bit installer for every Windows. On 64-bit Windows a 32-bit process is redirected
/// (System32 -> SysWOW64, HKLM\\SOFTWARE -> Wow6432Node); `Sysnative` is the escape hatch to the real 64-bit tools.
fn system_tool(rel: &str) -> PathBuf {
    let win = PathBuf::from(std::env::var_os("WINDIR").unwrap_or_else(|| "C:\\Windows".into()));
    let native = win.join("Sysnative");
    let base = if cfg!(target_pointer_width = "32") && native.exists() {
        native
    } else {
        win.join("System32")
    };
    base.join(rel)
}

/// Always address the 64-bit registry view; the flag is ignored on 32-bit Windows.
const VIEW: u32 = KEY_WOW64_64KEY;

/// Windows PowerShell 5.1 on purpose: Checkpoint-Computer / Enable-ComputerRestore don't exist in pwsh 7.
/// Inputs are passed via env vars, never interpolated into the script.
fn powershell(script: &str, label: &str) -> Result<String> {
    let out = Command::new(system_tool(r"WindowsPowerShell\v1.0\powershell.exe"))
        .args([
            "-NoProfile",
            "-NonInteractive",
            "-ExecutionPolicy",
            "Bypass",
            "-Command",
        ])
        .arg(format!("[Console]::OutputEncoding=[Text.Encoding]::UTF8; {script}"))
        .env("ZANREI_LABEL", label)
        .creation_flags(CREATE_NO_WINDOW)
        .output()?;
    if out.status.success() {
        Ok(String::from_utf8_lossy(&out.stdout).into_owned())
    } else {
        Err(Error::Msg(String::from_utf8_lossy(&out.stderr).trim().to_string()))
    }
}

fn hive(h: Hive) -> WinKey {
    WinKey::predef(match h {
        Hive::Hklm => HKEY_LOCAL_MACHINE,
        Hive::Hkcu => HKEY_CURRENT_USER,
    })
}

#[derive(Deserialize)]
#[serde(rename_all = "PascalCase")]
struct VideoController {
    name: Option<String>,
    driver_version: Option<String>,
    #[serde(rename = "AdapterRAM")]
    adapter_ram: Option<u64>,
    #[serde(rename = "PNPDeviceID")]
    pnp_device_id: Option<String>,
}

impl Platform for Windows {
    fn gpus(&self) -> Result<Vec<Gpu>> {
        let json = powershell(
            "ConvertTo-Json -Compress -InputObject @(Get-CimInstance Win32_VideoController | \
             Select-Object Name,DriverVersion,AdapterRAM,PNPDeviceID)",
            "",
        )?;
        let list: Vec<VideoController> = serde_json::from_str(json.trim())?;
        Ok(list
            .into_iter()
            .filter_map(|v| {
                let name = v.name?;
                // Skip virtual adapters (RDP, Hyper-V, remote-play drivers).
                let pnp = v.pnp_device_id.unwrap_or_default();
                if !pnp.to_ascii_uppercase().starts_with("PCI\\") {
                    return None;
                }
                Some(Gpu {
                    name,
                    vendor: vendor_from_pnp(&pnp),
                    driver_version: v.driver_version.unwrap_or_default(),
                    vram_bytes: v.adapter_ram.filter(|&b| b > 0),
                })
            })
            .collect())
    }

    fn reg_get(&self, key: &RegKey) -> Result<Option<RegValue>> {
        let Ok(sub) = hive(key.hive).open_subkey_with_flags(&key.path, KEY_READ | VIEW) else {
            return Ok(None);
        };
        let Ok(raw) = sub.get_raw_value(&key.name) else {
            return Ok(None);
        };
        Ok(Some(match raw.vtype {
            REG_DWORD => RegValue::Dword(sub.get_value(&key.name)?),
            REG_QWORD => RegValue::Qword(sub.get_value(&key.name)?),
            REG_SZ | REG_EXPAND_SZ => RegValue::String(sub.get_value(&key.name)?),
            // Refuse to journal what we can't restore byte-for-byte.
            other => return Err(Error::Msg(format!("unsupported registry type {other:?}"))),
        }))
    }

    fn reg_set(&self, key: &RegKey, value: &RegValue) -> Result<()> {
        let (sub, _) = hive(key.hive).create_subkey_with_flags(&key.path, KEY_WRITE | VIEW)?;
        match value {
            RegValue::Dword(v) => sub.set_value(&key.name, v)?,
            RegValue::Qword(v) => sub.set_value(&key.name, v)?,
            RegValue::String(v) => sub.set_value(&key.name, v)?,
        }
        Ok(())
    }

    fn reg_delete(&self, key: &RegKey) -> Result<()> {
        let Ok(sub) = hive(key.hive).open_subkey_with_flags(&key.path, KEY_WRITE | VIEW) else {
            return Ok(());
        };
        match sub.delete_value(&key.name) {
            Err(e) if e.kind() == std::io::ErrorKind::NotFound => Ok(()),
            r => Ok(r?),
        }
    }

    fn create_restore_point(&self, label: &str) -> Result<()> {
        // Windows silently skips a restore point if one was made in the last 24 h; lift that throttle
        // for this one call and put the previous value back afterwards.
        powershell(
            r#"$ErrorActionPreference='Stop'
$k='HKLM:\SOFTWARE\Microsoft\Windows NT\CurrentVersion\SystemRestore'
$n='SystemRestorePointCreationFrequency'
$old=(Get-ItemProperty $k -Name $n -ErrorAction SilentlyContinue).$n
Enable-ComputerRestore -Drive "$env:SystemDrive\"
Set-ItemProperty $k $n 0 -Type DWord
try { Checkpoint-Computer -Description $env:ZANREI_LABEL -RestorePointType MODIFY_SETTINGS }
finally { if ($null -eq $old) { Remove-ItemProperty $k $n -ErrorAction SilentlyContinue } else { Set-ItemProperty $k $n $old -Type DWord } }"#,
            label,
        )
        .map(|_| ())
    }

    fn open_system_restore(&self) -> Result<()> {
        Command::new(system_tool("rstrui.exe"))
            .creation_flags(CREATE_NO_WINDOW)
            .spawn()?;
        Ok(())
    }
}
