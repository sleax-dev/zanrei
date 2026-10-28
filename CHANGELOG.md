# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [Semantic Versioning](https://semver.org/).

## [0.3.0] - Unreleased

### Added
- Activity log page with live updates, level filter, search, copy and open-folder; a rotating log file on disk; crashes are logged.
- Navigation split into sections: one page per optimization group, a Library and a Graphics page for games, and Restore and Logs under Tools. Each group shows how many of its settings are on.
- Three-step first run: a ticked list of recommended settings applied with one button (safe ones pre-selected), then Automatic mode.
- Restore points now say what they contain (expandable list), and the undo dialog names the settings it will put back.
- A restore-point strip in the sidebar so the way back is always on screen.
- Settings that were already configured before Zanrei, including Windows defaults such as Game Mode, are read from Windows and shown correctly; the window re-reads them on focus.
- The restart notice is docked under the page, says which settings caused it, and offers Explorer restart, sign-out and restart.

### Changed
- Redesigned interface: flat surfaces instead of icon tiles and glow, distinct icons that fill when active, orange kept for actions and "on" states only, plural-aware text, dates without seconds.
- Error notifications stay until dismissed and link to the log.
- Updater: a release without update information is reported as "up to date" instead of an error.

## [0.2.0] - 2026-10-28

### Added
- Optimization catalog: about 40 reversible settings in six groups, each with a risk level, live state, a "recommended for your PC" hint and clear restart guidance (restart, sign out or restart Explorer).
- Microsoft Edge removal (advanced; the WebView2 runtime is left alone) and removal of pre-installed apps.
- Games: detection for Steam, Epic Games, GOG, Ubisoft Connect, the EA app and the Xbox app, custom games, per-game GPU preference, fullscreen-optimization and CPU-priority settings.
- Game Boost: high-performance power plan while a game runs, restored afterwards (and after a crash).
- Background mode with a system tray icon, optional start with Windows through a scheduled task, single running instance.
- Automatic updates: signed update packages, check at start-up and every six hours, optional automatic install.
- Temporary-files cleanup.
- Graphics card overview with driver version and age.
- Restore journal now also covers scheduled tasks and commands, not only registry values.
- New window design: custom Windows 11-style title bar with a "send to background" button.

### Changed
- Automatic mode applies only safe, recommended optimizations and never re-applies ones the user switched off.

## [0.1.0] - 2026-10-28

First release: the foundation.

### Added
- Setup wizard: language, hardware scan, first restore point, automation level.
- Hardware detection: operating system, processor, memory, graphics cards, drives, performance class.
- Mandatory restore: Windows restore point plus a registry journal, with undo from inside the app.
- Interface built with Fluent UI v9, Mica on Windows 11 and Motion animations.
- 10 interface languages, selected automatically from the system language.
- A single 32-bit NSIS installer for Windows 10 and 11 (32-bit and 64-bit).
