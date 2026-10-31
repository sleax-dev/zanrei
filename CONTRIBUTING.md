# Contributing to Zanrei

Zanrei changes system settings, so every contribution has one priority: **users must be able to undo everything it does.**

Before starting on a larger change, please open an issue so we can agree on the approach.

## Rules

1. **Every system change goes through a snapshot.** Registry values are written with `restore::Store::reg_set`. A direct call to `Platform::reg_set` that bypasses it will not be accepted.
2. **OS-specific code lives only in `crates/core/src/platform/`.** The core and the UI stay OS-independent.
3. **Before changing anything shared, find everything that uses it.** If a function, setting or dependency has other callers, check all of them. A fix for one path must not alter the others. Prefer adding something small and narrowly scoped over modifying a shared piece.
4. **Logic comes with a test.** Branches, parsing and rollback paths need the smallest test that fails if they break. The tests in `restore.rs` (using a fake `Platform`) are the model.
5. **Never interpolate external text into a command.** Inputs reach PowerShell through environment variables.
6. **User-facing text comes from the translation files.** Add a key to `src/i18n/locales/en.ts`; the other locale files fail to compile until they have it.

## Development setup

Requirements: the current Node.js LTS, Rust (stable), the `i686-pc-windows-msvc` target, Visual Studio Build Tools (C++), WebView2.

```powershell
npm install
npm run tauri dev                      # run the app (use a non-elevated terminal)
npx tsc                                # type-check the UI
npm run check:i18n                     # every locale key exists and every tweak has text
cargo test -p zanrei-core              # core tests (also run on non-Windows hosts)
cargo fmt --all --check                # formatting
cargo clippy -p zanrei-core -- -D warnings

rustup target add i686-pc-windows-msvc
npm run tauri build -- --target i686-pc-windows-msvc --bundles nsis
```

The installer is written to `target/i686-pc-windows-msvc/release/bundle/nsis/`. Release builds embed an administrator manifest; debug builds do not, so `tauri dev` starts from a normal terminal.

## Project layout

```
zanrei/
├── crates/core/          OS-independent core (Rust, zanrei-core)
│   └── src/
│       ├── platform/     Everything that touches the OS: the Platform trait,
│       │                 windows.rs (real) and other.rs (placeholder elsewhere)
│       ├── tweaks/       The optimization catalog and how each one is applied and read back
│       ├── restore.rs    Snapshots and the write-ahead journal
│       ├── games.rs      Launcher detection and per-game settings
│       ├── startup.rs, cleanup.rs, system.rs, power.rs, settings.rs
├── src-tauri/            Tauri 2 shell: commands, window, tray, updater, installer
├── src/                  UI: React 19, TypeScript, Fluent UI v9, Motion
│   ├── pages/, components/, i18n/ (en.ts and tr.ts are complete)
│   └── guide.ts          Data for the Guide page
├── docs/                 Research notes and the README screenshots
└── .github/workflows/    Tests and release build
```

## How restore works

A snapshot is one Windows restore point plus a write-ahead journal of every registry value Zanrei changes.

- If the restore point cannot be created, no snapshot is created and the caller must not proceed.
- A value's previous state is written to the journal **before** it is changed, so the journal is complete even if the app is killed mid-change.
- If the same value changes several times in one snapshot, the first (original) value is kept.
- Rollback replays entries newest-first: values that did not exist are deleted, others are restored. One failing entry does not stop the rest; failures are reported at the end.
- The journal covers registry values, scheduled tasks and commands with a defined revert. Things that cannot be reverted (removing Edge or built-in apps, disk cleanup) are never journaled and are flagged as irreversible in the UI.

## Platform notes

- **One installer for 32-bit and 64-bit Windows.** The app is built as 32-bit (`i686`). On 64-bit Windows a 32-bit process is redirected to `SysWOW64` and `Wow6432Node`, so the code explicitly uses the 64-bit registry view and the `Sysnative` path for system tools.
- **Windows 8.1 and older are out of scope.** WebView2 support ended at version 109, and Rust's standard Windows targets require Windows 10.
- Mica is applied on Windows 11 only; on Windows 10 the UI falls back to a solid background.

## Adding a language

Copy `src/i18n/locales/en.ts`, translate it, add `import type { Locale, Translation } from "./en"` at the top and `satisfies Translation<Locale>` at the end (a missing key is a compile error), then add the language to `resources` and `LANGUAGES` in `src/i18n/index.ts`. For right-to-left languages, also add it to `RTL`. A counted text needs every plural form the language uses (`_one`, `_few`, `_many`… per `Intl.PluralRules`); `npm run check:i18n` lists any that are missing. Current translations are machine-drafted and welcome review by native speakers.

## Adding an operating system

Add a new `Platform` implementation under `crates/core/src/platform/` and select it in `platform::current()`. The core and the UI do not change. Window effects and elevation in the Tauri shell need per-platform handling.

## Known limitations

- The installer is not code-signed.
- Video memory is read from a 32-bit Windows field and may be wrong above 4 GB; it will be read from the registry when graphics profiles are added.
- The performance class uses simple thresholds (memory, cores, SSD, discrete GPU) and will be tuned against real hardware.

## Releasing

1. Update `CHANGELOG.md` and set the new version in `package.json`, `src-tauri/tauri.conf.json`, `src-tauri/Cargo.toml` and `crates/core/Cargo.toml` (then `cargo check` to refresh `Cargo.lock`).
2. Wait for the CI run on `main` to be green, then push a tag such as `v0.5.1`. GitHub Actions tests, builds the installer and publishes the release.
3. Installed copies find the release through `latest.json`, which the workflow uploads next to the installer, and verify its signature against the public key in `src-tauri/tauri.conf.json`.

**Updater signing key.** The release workflow signs update packages with the private key stored in the repository secret `TAURI_SIGNING_PRIVATE_KEY` (and `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` if it has a password). Without the secret a release still builds but is not offered as an update. Keep a backup of the key: if it is lost, installed copies can no longer verify updates and users must reinstall manually. Never commit it. Generate a new pair with `npx tauri signer generate -w <file>` and put the public half in `plugins.updater.pubkey`.

**Code signing** (removes the SmartScreen warning) is not set up yet. It needs an Authenticode certificate; see Tauri's Windows signing guide and set `bundle.windows.certificateThumbprint` or use a signing service in the workflow.

## Before opening a pull request

```powershell
npx tsc
npm run check:i18n
cargo fmt --all --check
cargo clippy -p zanrei-core -- -D warnings
cargo test -p zanrei-core
```

On Windows, also run the app with `npm run tauri dev` and try the flow you changed. If you could not test on Windows, say so in the pull request.

## Commit messages

A short summary line, then, if needed, a blank line and a paragraph explaining why the change was made (not what it does).
