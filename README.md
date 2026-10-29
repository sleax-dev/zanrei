# Zanrei

[![Build](https://github.com/sleax-dev/zanrei/actions/workflows/release.yml/badge.svg)](https://github.com/sleax-dev/zanrei/actions/workflows/release.yml)
[![Release](https://img.shields.io/github/v/release/sleax-dev/zanrei?include_prereleases)](https://github.com/sleax-dev/zanrei/releases)
![Platform](https://img.shields.io/badge/platform-Windows%2010%20%7C%2011-0078D4)

A Windows optimization app where every change can be undone.

Zanrei looks at your PC's hardware, works out what can be improved, and only changes anything after creating a restore point. Whatever it does, you can undo from inside the app. It keeps itself up to date.

> **Early development.** Features work as described below, but the app is young: read what a tweak does before you switch it on, and keep Zanrei's restore points around until you are comfortable.

## Features

- **Three-step setup.** An animated opening with the logo, then Welcome, a list of what suits your PC (safe settings are already ticked, the rest are offered) and Done. One button applies them, after a restore point is made.
- **Optimizations you can switch on and off one by one.** About 45 settings in six groups (privacy, performance, gaming, interface, system, cleanup). Each one has a plain-language description and a risk level: **safe**, **moderate** or **advanced**. A switch always reflects what Windows is set to right now, so a setting someone changed earlier, or another tool changed, shows up as on or off. Zanrei looks again whenever you come back to the window. Zanrei marks the ones that suit your hardware as *recommended*.
- **Restart only when needed.** If a change needs a restart, a sign-out or an Explorer restart, Zanrei says so and offers a button for exactly that, with a countdown you can cancel.
- **Startup programs.** See everything that starts with Windows (Run keys and Startup folders) and switch entries off and on, the same way Task Manager does. Nothing is uninstalled, and every switch goes through the restore journal.
- **Games and graphics.** Zanrei reads the launchers' own records to find games from Steam, Epic Games, GOG, Ubisoft Connect, the EA app, the Xbox app, Battle.net, Riot Games, Rockstar and Bethesda, and lets you add any other game. A running game is recognised by the folder its process runs from, not only by file name. Per game you can run it on the high-performance GPU, turn off fullscreen optimizations and start it with higher CPU priority. Graphics card, driver version and driver age are shown with a link to the vendor's driver page.
- **Game Boost.** While a game is running, Zanrei switches Windows to the high-performance power plan (recreating it on laptops that hide it) and puts your previous plan back when the game closes.
- **Runs in the background.** The window has a fixed size, a minimize button (to the taskbar) and a close button. Closing sends Zanrei to the system tray once setup is done; it can start with Windows (without a UAC prompt) and both behaviours can be turned off in Settings.
- **Remove Microsoft Edge** and **remove pre-installed apps** (Candy Crush, Solitaire, TikTok and similar; Xbox, Store, Photos and Calculator are never touched). Both are advanced, **cannot be undone**, and ask you to tick "I understand this cannot be undone" first.
- **Disk cleanup.** Measures temporary files, crash dumps, Windows update leftovers, browser caches and the Recycle Bin, then deletes only what you tick. Shader caches are deliberately left alone.
- **Live numbers.** The Overview shows processor, memory, process count and startup programs, so the effect of a change can be seen instead of trusted.
- **Restore points you can delete.** From the Restore page, one at a time or all at once; the matching Windows restore point goes with it.
- **Activity log.** Everything Zanrei changes, and everything that goes wrong, with a copy button and a link to the log folder for when you need to ask for help.
- **Organised by what you want to do.** Privacy, performance, gaming, Windows and cleanup each have their own page; games and graphics sit in their own section.
- **Automatic updates.** Zanrei checks for a new version at start-up and every few hours, downloads it and installs it. Update packages are cryptographically signed; Zanrei refuses anything that is not. You can switch to manual updates in Settings.
- **Windows 11 look and feel.** Fluent UI, the Mica backdrop on Windows 11 and a clean dark theme on Windows 10, in the silver of the logo. Loading states are skeletons, not spinners.
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
- Some things cannot be undone, and Zanrei says so before you do them: removing Edge, removing pre-installed apps, disk cleanup and deleting restore points. They are marked in red, are never part of "apply all" or automatic mode, and the first two need an explicit acknowledgement. Edge is uninstalled and Windows is blocked from putting it back; to get it back later, delete the value `Install{56EB18F8-B008-4CBD-B6D2-8C97FE7E9062}` under `HKLM\SOFTWARE\Policies\Microsoft\EdgeUpdate` and install Edge from microsoft.com.
- Deleting a restore point on the Restore page leaves the changes in place; they just can no longer be undone from Zanrei.

## Automation levels

Choose during setup and change any time in **Settings**:

| Level | What Zanrei does |
|---|---|
| Manual | Nothing happens unless you choose it. |
| Recommended *(default)* | Suggests safe improvements; you confirm each one. |
| Automatic | Applies the safe improvements that suit your PC by itself, always after creating a restore point. Moderate and advanced options are never applied automatically, and anything you switched off by hand stays off. |

## Privacy

Zanrei has no telemetry and no account. It contacts the internet only to check for updates (GitHub), to download WebView2 if it is missing, and when you ask it to reinstall Edge or open a vendor page.

## How the optimizations were chosen

Every setting in the catalog was checked against widely used open-source tools and Microsoft's documentation, and anything whose benefit could not be backed up was left out. The comparison, what Zanrei takes and what it deliberately does not, is in [docs/OPTIMIZATION-RESEARCH.md](docs/OPTIMIZATION-RESEARCH.md).

## Roadmap

- [x] Setup wizard, hardware detection, restore and undo
- [x] Optimization catalog, Edge removal, cleanup
- [x] Games, per-game settings, Game Boost, graphics driver overview
- [x] Background mode and start with Windows
- [x] Automatic updates
- [ ] Code signing for the installer
- [x] Startup program manager, disk cleanup with measuring, restore point deletion
- [x] Professional game detection (launcher manifests, folder-based process matching)
- [ ] Vendor-specific graphics driver profiles

## Contributing, security and license

- Want to contribute? Read [CONTRIBUTING.md](CONTRIBUTING.md), which also covers building from source and releasing.
- Found a security issue? See [SECURITY.md](SECURITY.md).
- What changed in each version: [CHANGELOG.md](CHANGELOG.md).
- License: not yet decided.

## Acknowledgements

Registry values and the list of removable apps were cross-checked against the work of widely used open-source projects, all MIT-licensed: [winutil](https://github.com/ChrisTitusTech/winutil), [Win11Debloat](https://github.com/Raphire/Win11Debloat) and [Windows10Debloater](https://github.com/Sycnex/Windows10Debloater). Edge removal follows the method documented by winutil. No code was copied.
