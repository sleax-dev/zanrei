# Zanrei

[![Build](https://github.com/sleax-dev/zanrei/actions/workflows/release.yml/badge.svg)](https://github.com/sleax-dev/zanrei/actions/workflows/release.yml)
[![Release](https://img.shields.io/github/v/release/sleax-dev/zanrei?include_prereleases)](https://github.com/sleax-dev/zanrei/releases)
![Platform](https://img.shields.io/badge/platform-Windows%2010%20%7C%2011-0078D4)

A Windows optimization app where every change can be undone.

Zanrei looks at your PC's hardware, works out what can be improved, and only changes anything after creating a restore point. Whatever it does, you can undo from inside the app. It keeps itself up to date.

> **Early development (v0.2).** Features work as described below, but the app is young: read what a tweak does before you switch it on, and keep Zanrei's restore points around until you are comfortable.

## Features

- **Guided setup.** Pick your language, review what Zanrei found on your PC, create your first restore point and choose how much Zanrei may do on its own.
- **Optimizations you can switch on and off one by one.** About 40 settings in six groups (privacy, performance, gaming, interface, system, cleanup). Each one has a plain-language description and a risk level: **safe**, **moderate** or **advanced**. A switch reflects what Windows is actually set to right now. Zanrei marks the ones that suit your hardware as *recommended*.
- **Restart only when needed.** If a change needs a restart, a sign-out or an Explorer restart, Zanrei says so and offers a button for exactly that, with a countdown you can cancel.
- **Games and graphics.** Zanrei finds games from Steam, Epic Games, GOG, Ubisoft Connect, the EA app and the Xbox app, and lets you add any other game. Per game you can run it on the high-performance GPU, turn off fullscreen optimizations and start it with higher CPU priority. Graphics card, driver version and driver age are shown with a link to the vendor's driver page.
- **Game Boost.** While a game is running, Zanrei switches Windows to the high-performance power plan and puts your previous plan back when the game closes.
- **Runs in the background.** Closing the window sends Zanrei to the system tray. It can start with Windows (without a UAC prompt) and both behaviours can be turned off in Settings.
- **Remove Microsoft Edge** and **remove pre-installed apps** (Candy Crush, Solitaire, TikTok and similar; Xbox, Store, Photos and Calculator are never touched). Both are advanced options and are described in detail before you use them.
- **Cleanup tool.** Frees temporary files that nothing is using.
- **Automatic updates.** Zanrei checks for a new version at start-up and every few hours, downloads it and installs it. Update packages are cryptographically signed; Zanrei refuses anything that is not. You can switch to manual updates in Settings.
- **Windows 11 look and feel.** Fluent UI, the Mica backdrop on Windows 11 and a clean dark theme on Windows 10.
- **10 languages.** English, Türkçe, Español, Deutsch, Français, Português, Русский, 简体中文, 日本語 and العربية (right-to-left supported). The language follows your Windows language and can be changed at any time.

## Requirements

| | |
|---|---|
| Operating system | Windows 10 or Windows 11, 32-bit or 64-bit |
| Permissions | Administrator (Zanrei asks when it starts) |
| WebView2 | Required. The installer downloads it automatically if it is missing. |

Windows 8.1 and older are not supported.

## Installation

1. Download the latest `Zanrei_<version>_x86-setup.exe` from [Releases](https://github.com/sleax-dev/zanrei/releases).
2. Run it and follow the installer. The same installer works on 32-bit and 64-bit Windows.
3. Start Zanrei. The setup wizard opens on first launch.

The installer is not code-signed yet, so Windows SmartScreen may show an "unknown publisher" warning. Choose **More info → Run anyway** to continue. After that, updates install themselves.

## Staying safe

Before Zanrei changes anything it creates a **snapshot**: a Windows restore point plus its own record of every setting it touches.

- No restore point, no changes. If one cannot be created, Zanrei stops.
- Undo any snapshot from the **Restore** page. Settings that existed are put back; settings Zanrei added are removed.
- Switching a single optimization off puts Windows' default back.
- For a full system rollback, open Windows System Restore from the Restore page.
- Removing pre-installed apps cannot be undone by Zanrei (reinstall them from the Microsoft Store). Removing Edge can be undone from the same switch, which reinstalls it with winget.

## Automation levels

Choose during setup and change any time in **Settings**:

| Level | What Zanrei does |
|---|---|
| Manual | Nothing happens unless you choose it. |
| Recommended *(default)* | Suggests safe improvements; you confirm each one. |
| Automatic | Applies the safe improvements that suit your PC by itself, always after creating a restore point. Moderate and advanced options are never applied automatically, and anything you switched off by hand stays off. |

## Privacy

Zanrei has no telemetry and no account. It contacts the internet only to check for updates (GitHub), to download WebView2 if it is missing, and when you ask it to reinstall Edge or open a vendor page.

## Roadmap

- [x] Setup wizard, hardware detection, restore and undo
- [x] Optimization catalog, Edge removal, cleanup
- [x] Games, per-game settings, Game Boost, graphics driver overview
- [x] Background mode and start with Windows
- [x] Automatic updates
- [ ] Code signing for the installer
- [ ] Startup program manager
- [ ] Vendor-specific graphics driver profiles

## Contributing, security and license

- Want to contribute? Read [CONTRIBUTING.md](CONTRIBUTING.md), which also covers building from source and releasing.
- Found a security issue? See [SECURITY.md](SECURITY.md).
- What changed in each version: [CHANGELOG.md](CHANGELOG.md).
- License: not yet decided.

## Acknowledgements

Registry values and the list of removable apps were cross-checked against the work of widely used open-source projects, all MIT-licensed: [winutil](https://github.com/ChrisTitusTech/winutil), [Win11Debloat](https://github.com/Raphire/Win11Debloat) and [Windows10Debloater](https://github.com/Sycnex/Windows10Debloater). Edge removal follows the method documented by winutil. No code was copied.
