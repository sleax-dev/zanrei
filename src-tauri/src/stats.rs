//! The live user count on sleax.dev and in Settings (stats.sleax.dev). While the app runs, and the
//! "count me" setting is on, it sends a random id made once per install every five minutes: no name,
//! no system details. The service keeps ids in memory for eleven minutes and only counts them.

use reqwest::blocking::Client;
use serde_json::Value;
use std::hash::{BuildHasher, RandomState};
use std::path::Path;
use std::sync::LazyLock;
use std::time::Duration;

const API: &str = "https://stats.sleax.dev/v1";
const APP: &str = "zanrei";
const EVERY: Duration = Duration::from_secs(5 * 60);

/// Its own client with short timeouts. rustls needs a crypto provider: the same one the updater installs
/// (it only installs one when none is set, so whichever runs first, both use ring).
static CLIENT: LazyLock<Client> = LazyLock::new(|| {
    if rustls::crypto::CryptoProvider::get_default().is_none() {
        let _ = rustls::crypto::ring::default_provider().install_default();
    }
    Client::builder()
        .timeout(Duration::from_secs(10))
        .build()
        .unwrap_or_default()
});

pub fn start(dir: &Path, enabled: impl Fn() -> bool + Send + 'static) {
    let Some(id) = install_id(dir) else { return };
    std::thread::spawn(move || {
        std::thread::sleep(Duration::from_secs(15)); // let the network come up after logon
        loop {
            if enabled() {
                let _ = CLIENT
                    .post(format!("{API}/ping"))
                    .json(&serde_json::json!({ "app": APP, "id": id }))
                    .send();
            }
            std::thread::sleep(EVERY);
        }
    });
}

/// A random id for this install, made on first use: 32 hex digits from the OS-seeded hasher keys.
fn install_id(dir: &Path) -> Option<String> {
    let path = dir.join("install-id");
    if let Ok(id) = std::fs::read_to_string(&path)
        && id.trim().len() == 32
    {
        return Some(id.trim().to_string());
    }
    let id = format!(
        "{:016x}{:016x}",
        RandomState::new().hash_one(0u8),
        RandomState::new().hash_one(1u8)
    );
    let _ = std::fs::create_dir_all(dir);
    std::fs::write(&path, &id).ok()?;
    Some(id)
}

/// This app's numbers: live, downloads, stars, version.
#[tauri::command]
pub async fn app_stats() -> Result<Value, String> {
    tauri::async_runtime::spawn_blocking(|| {
        let all: Value = CLIENT
            .get(format!("{API}/stats"))
            .send()
            .and_then(|r| r.error_for_status())
            .and_then(|r| r.json())
            .map_err(|e| e.to_string())?;
        Ok(all["apps"][APP].clone())
    })
    .await
    .map_err(|e| e.to_string())?
}
