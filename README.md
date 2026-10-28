# Zanrei

[![Build](https://github.com/thesleax/zanrei/actions/workflows/release.yml/badge.svg)](https://github.com/thesleax/zanrei/actions/workflows/release.yml)
[![Release](https://img.shields.io/github/v/release/thesleax/zanrei?include_prereleases)](https://github.com/thesleax/zanrei/releases)
![Platform](https://img.shields.io/badge/platform-Windows%2010%20%7C%2011-0078D4)

A Windows optimization app where every change can be undone.

Zanrei looks at your PC's hardware, works out what can be improved, and only changes anything after creating a restore point. Whatever it does, you can undo from inside the app.

> **Early development (v0.1).** This release provides the foundation: setup wizard, hardware detection, the mandatory restore system and the app interface. Optimizations, Edge removal and game/graphics-card profiles are on the [roadmap](#roadmap).

## Features

- **Guided setup.** Pick your language, review what Zanrei found on your PC, create your first restore point and choose how much Zanrei may do on its own.
- **Hardware detection.** Windows version, processor, memory, graphics cards (NVIDIA, AMD, Intel) and drives, with a performance class (older, mainstream, high-performance) that future recommendations will build on.
- **Restore first.** Zanrei never changes your system without a restore point. Every change is recorded and can be undone with one click.
- **Windows 11 look and feel.** Built with Fluent UI, with the Mica backdrop on Windows 11 and a clean dark theme on Windows 10.
- **10 languages.** English, Türkçe, Español, Deutsch, Français, Português, Русский, 简体中文, 日本語 and العربية (right-to-left supported). The language follows your Windows language and can be changed at any time.

## Requirements

| | |
|---|---|
| Operating system | Windows 10 or Windows 11, 32-bit or 64-bit |
| Permissions | Administrator (Zanrei asks when it starts) |
| WebView2 | Required. The installer downloads it automatically if it is missing. |

Windows 8.1 and older are not supported.

## Installation

1. Download the latest `Zanrei_<version>_x86-setup.exe` from [Releases](https://github.com/thesleax/zanrei/releases).
2. Run it and follow the installer. The same installer works on 32-bit and 64-bit Windows.
3. Start Zanrei. The setup wizard opens on first launch.

The installer is not code-signed yet, so Windows SmartScreen may show an "unknown publisher" warning. Choose **More info → Run anyway** to continue.

## Staying safe

Before Zanrei changes anything it creates a **snapshot**: a Windows restore point plus its own record of every setting it touches.

- No restore point, no changes. If one cannot be created, Zanrei stops.
- Undo any snapshot from the **Restore** page. Settings that existed are put back; settings Zanrei added are removed.
- For a full system rollback, open Windows System Restore from the same page.

## Automation levels

Choose during setup and change any time in **Settings**:

| Level | What Zanrei does |
|---|---|
| Manual | Nothing happens unless you choose it. |
| Recommended *(default)* | Suggests safe improvements; you confirm each one. |
| Automatic | Applies safe improvements by itself, always after creating a restore point. |

## Roadmap

- [x] **Foundation:** setup wizard, hardware detection, restore and undo, app interface
- [ ] **Windows optimizations:** a catalog of tweaks grouped by risk (safe / moderate / advanced), each explained and reversible; Microsoft Edge removal
- [ ] **Games and graphics cards:** detect installed games and apply per-game settings; NVIDIA, AMD and Intel profiles, including older cards and older PCs
- [ ] **Background mode:** run in the system tray and start with Windows, both optional
- [ ] **Distribution:** code signing and automatic updates

## Contributing, security and license

- Want to contribute? Read [CONTRIBUTING.md](CONTRIBUTING.md), which also covers building from source.
- Found a security issue? See [SECURITY.md](SECURITY.md).
- What changed in each version: [CHANGELOG.md](CHANGELOG.md).
- License: not yet decided.
