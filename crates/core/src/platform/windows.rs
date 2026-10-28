use super::*;
use crate::Error;
use serde::Deserialize;
use std::collections::HashMap;
use std::os::windows::process::CommandExt;
use std::path::PathBuf;
use std::process::Command;
use std::sync::Mutex;
use std::time::{Duration, Instant};
use winreg::{RegKey as WinKey, enums::*};

const CREATE_NO_WINDOW: u32 = 0x0800_0000;

/// All scheduled-task states from one PowerShell call, kept for a few seconds: asking per task
/// would start PowerShell (~0.4 s) dozens of times when the tweak list loads.
#[derive(Default)]
pub struct Windows {
    tasks: Mutex<Option<(Instant, HashMap<String, bool>)>>,
}

const TASK_CACHE_TTL: Duration = Duration::from_secs(5);

fn windir() -> PathBuf {
    PathBuf::from(std::env::var_os("WINDIR").unwrap_or_else(|| "C:\\Windows".into()))
}

/// Zanrei ships one 32-bit installer for every Windows. On 64-bit Windows a 32-bit process is redirected
/// (System32 -> SysWOW64, HKLM\SOFTWARE -> Wow6432Node); `Sysnative` is the escape hatch to the real 64-bit tools.
fn system_tool(rel: &str) -> PathBuf {
    let win = windir();
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

fn exec(mut cmd: Command) -> Result<String> {
    let out = cmd.creation_flags(CREATE_NO_WINDOW).output()?;
    let text = |b: &[u8]| String::from_utf8_lossy(b).trim().to_string();
    if out.status.success() {
        Ok(text(&out.stdout))
    } else {
        let msg = [text(&out.stderr), text(&out.stdout)]
            .into_iter()
            .find(|s| !s.is_empty());
        Err(Error::Msg(
            msg.unwrap_or_else(|| format!("exit code {:?}", out.status.code())),
        ))
    }
}

/// Windows PowerShell 5.1 on purpose: Checkpoint-Computer / Enable-ComputerRestore don't exist in pwsh 7.
/// Inputs are passed via env vars, never interpolated into the script.
fn powershell(script: &str, envs: &[(&str, &str)]) -> Result<String> {
    let mut cmd = Command::new(system_tool(r"WindowsPowerShell\v1.0\powershell.exe"));
    cmd.args([
        "-NoProfile",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Bypass",
        "-Command",
    ])
    .arg(format!("[Console]::OutputEncoding=[Text.Encoding]::UTF8; {script}"));
    for (k, v) in envs {
        cmd.env(k, v);
    }
    exec(cmd)
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
    driver_date: Option<String>,
    #[serde(rename = "AdapterRAM")]
    adapter_ram: Option<u64>,
    #[serde(rename = "PNPDeviceID")]
    pnp_device_id: Option<String>,
}

/// Edge installs under Program Files (x86) on 64-bit Windows and Program Files on 32-bit Windows.
fn edge_setup() -> Option<PathBuf> {
    ["ProgramFiles(x86)", "ProgramFiles"]
        .iter()
        .filter_map(std::env::var_os)
        .filter_map(|pf| std::fs::read_dir(PathBuf::from(pf).join(r"Microsoft\Edge\Application")).ok())
        .flatten()
        .flatten()
        .map(|e| e.path().join(r"Installer\setup.exe"))
        .filter(|p| p.is_file())
        .max_by_key(|p| p.to_string_lossy().into_owned()) // version folders sort fine as text for the same digit count
}

impl Platform for Windows {
    fn gpus(&self) -> Result<Vec<Gpu>> {
        let json = powershell(
            "ConvertTo-Json -Compress -InputObject @(Get-CimInstance Win32_VideoController | \
             Select-Object Name,DriverVersion,DriverDate,AdapterRAM,PNPDeviceID)",
            &[],
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
                    driver_date_unix: v.driver_date.as_deref().and_then(parse_ps_date),
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
            REG_BINARY => RegValue::Binary(raw.bytes.to_vec()),
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
            RegValue::Binary(v) => sub.set_raw_value(
                &key.name,
                &winreg::RegValue {
                    bytes: v.clone().into(),
                    vtype: REG_BINARY,
                },
            )?,
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

    fn reg_subkeys(&self, h: Hive, path: &str) -> Result<Vec<String>> {
        let Ok(sub) = hive(h).open_subkey_with_flags(path, KEY_READ | VIEW) else {
            return Ok(vec![]);
        };
        Ok(sub.enum_keys().flatten().collect())
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
            &[("ZANREI_LABEL", label)],
        )
        .map(|_| ())
    }

    fn open_system_restore(&self) -> Result<()> {
        Command::new(system_tool("rstrui.exe"))
            .creation_flags(CREATE_NO_WINDOW)
            .spawn()?;
        Ok(())
    }

    fn run(&self, program: &str, args: &[&str]) -> Result<String> {
        // System tools resolve through System32/Sysnative so a 32-bit process reaches the real ones;
        // anything else (winget) is looked up on PATH.
        let exe = match program {
            "powercfg" | "schtasks" | "shutdown" | "taskkill" => system_tool(&format!("{program}.exe")),
            other => PathBuf::from(other),
        };
        let mut cmd = Command::new(exe);
        cmd.args(args);
        exec(cmd)
    }

    fn task_enabled(&self, path: &str) -> Result<Option<bool>> {
        let mut cache = self.tasks.lock().unwrap_or_else(|e| e.into_inner());
        if cache.as_ref().is_none_or(|(at, _)| at.elapsed() > TASK_CACHE_TTL) {
            let out = powershell(
                "Get-ScheduledTask | ForEach-Object { \"$($_.TaskPath)$($_.TaskName)|$($_.State)\" }",
                &[],
            )?;
            let map = out
                .lines()
                .filter_map(|l| l.rsplit_once('|'))
                .map(|(p, state)| (p.to_ascii_lowercase(), state.trim() != "Disabled"))
                .collect();
            *cache = Some((Instant::now(), map));
        }
        Ok(cache
            .as_ref()
            .and_then(|(_, m)| m.get(&path.to_ascii_lowercase()).copied()))
    }

    fn task_set_enabled(&self, path: &str, enabled: bool) -> Result<()> {
        *self.tasks.lock().unwrap_or_else(|e| e.into_inner()) = None;
        self.run(
            "schtasks",
            &["/Change", "/TN", path, if enabled { "/ENABLE" } else { "/DISABLE" }],
        )
        .map(|_| ())
    }

    fn edge_installed(&self) -> bool {
        edge_setup().is_some()
    }

    /// Windows blocks Edge's own uninstaller unless the legacy Edge stub exists, so a placeholder is created for
    /// the duration of the uninstall. Only the browser is removed; the WebView2 runtime is a separate product.
    fn remove_edge(&self) -> Result<()> {
        let setup = edge_setup().ok_or_else(|| Error::Msg("Microsoft Edge is not installed".into()))?;
        let dir = windir().join(r"SystemApps\Microsoft.MicrosoftEdge_8wekyb3d8bbwe");
        let stub = dir.join("MicrosoftEdge.exe");
        let (made_dir, made_stub) = (!dir.exists(), !stub.exists());
        std::fs::create_dir_all(&dir)?;
        if made_stub {
            std::fs::File::create(&stub)?;
        }
        let result = exec({
            let mut c = Command::new(&setup);
            c.args(["--uninstall", "--system-level", "--force-uninstall", "--delete-profile"]);
            c
        });
        if made_stub {
            let _ = std::fs::remove_file(&stub);
        }
        if made_dir {
            let _ = std::fs::remove_dir(&dir);
        }
        // The installer's exit codes vary by version; the folder being gone is the real test.
        if edge_setup().is_some() {
            return Err(match result {
                Err(e) => e,
                Ok(_) => Error::Msg("Microsoft Edge is still installed after the uninstaller finished".into()),
            });
        }
        Ok(())
    }

    fn reinstall_edge(&self) -> Result<()> {
        self.run(
            "winget",
            &[
                "install",
                "--id",
                "Microsoft.Edge",
                "-e",
                "--silent",
                "--accept-package-agreements",
                "--accept-source-agreements",
            ],
        )
        .map(|_| ())
    }

    fn installed_apps(&self, names: &[&str]) -> Result<Vec<String>> {
        let out = powershell(
            "$n = $env:ZANREI_APPS -split ';'; \
             Get-AppxPackage -AllUsers | Where-Object { $n -contains $_.Name } | ForEach-Object { $_.Name } | Sort-Object -Unique",
            &[("ZANREI_APPS", &names.join(";"))],
        )?;
        Ok(out
            .lines()
            .map(|l| l.trim().to_string())
            .filter(|l| !l.is_empty())
            .collect())
    }

    fn remove_apps(&self, names: &[&str]) -> Result<()> {
        powershell(
            r#"$ErrorActionPreference='SilentlyContinue'
foreach ($n in ($env:ZANREI_APPS -split ';')) {
  Get-AppxPackage -AllUsers -Name $n | Remove-AppxPackage -AllUsers
  Get-AppxProvisionedPackage -Online | Where-Object { $_.DisplayName -eq $n } | Remove-AppxProvisionedPackage -Online | Out-Null
}"#,
            &[("ZANREI_APPS", &names.join(";"))],
        )
        .map(|_| ())
    }
}
