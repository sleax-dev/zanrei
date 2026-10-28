# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [Semantic Versioning](https://semver.org/).

## [0.2.0] - Unreleased

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
