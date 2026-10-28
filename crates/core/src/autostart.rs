//! "Start with Windows" for an app that needs administrator rights: a scheduled task at logon with
//! highest privileges, because a Run-key entry would show a UAC prompt on every boot.

use crate::Result;
use crate::platform::Platform;

const TASK: &str = "Zanrei";

pub fn enabled(p: &dyn Platform) -> bool {
    p.run("schtasks", &["/Query", "/TN", TASK]).is_ok()
}

pub fn set(p: &dyn Platform, exe: &str, on: bool) -> Result<()> {
    if on {
        let command = format!("\"{exe}\" --background");
        p.run(
            "schtasks",
            &[
                "/Create", "/TN", TASK, "/SC", "ONLOGON", "/DELAY", "0000:10", "/RL", "HIGHEST", "/TR", &command, "/F",
            ],
        )
        .map(|_| ())
    } else if enabled(p) {
        p.run("schtasks", &["/Delete", "/TN", TASK, "/F"]).map(|_| ())
    } else {
        Ok(())
    }
}
