//! OS-independent core. Everything that touches the OS goes through `platform::Platform`,
//! so porting to macOS/Linux means adding one more `Platform` impl and nothing else.

pub mod platform;
pub mod restore;
pub mod settings;
pub mod system;

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error("not supported on this operating system")]
    Unsupported,
    #[error("{0}")]
    Msg(String),
    #[error(transparent)]
    Io(#[from] std::io::Error),
    #[error(transparent)]
    Json(#[from] serde_json::Error),
}

pub type Result<T> = std::result::Result<T, Error>;
