fn main() {
    // Release builds ask for admin rights (restore points and HKLM edits need them).
    // Debug builds keep the default manifest so `tauri dev` runs from a normal terminal.
    let attrs = if std::env::var("PROFILE").is_ok_and(|p| p == "release") {
        tauri_build::Attributes::new()
            .windows_attributes(tauri_build::WindowsAttributes::new().app_manifest(include_str!("app.manifest")))
    } else {
        tauri_build::Attributes::new()
    };
    tauri_build::try_build(attrs).expect("tauri build failed");
}
