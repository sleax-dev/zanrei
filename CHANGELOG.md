# Changelog

Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versions follow [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [0.5.3] - 2026-10-29

### Changed
- Game Boost shows On or Off in the sidebar above Settings, in your language, instead of a badge in the title bar that appeared only while a game ran.
- Right-click does nothing in the app (no browser menu).

### Fixed
- Log times in 12-hour languages ("10:29:53 PM") no longer wrap onto a second line.

## [0.5.2] - 2026-10-29

### Changed
- Overview: hardware is one list with a fill bar per drive instead of four cards, and the live numbers are one strip; shorter label for startup programs.
- Page header, search box and collapsible sections are shared components instead of copies in each page.
- README rewritten with screenshots; CONTRIBUTING brought up to date.

### Security
- The executable path of a game is validated (full path to a `.exe`, no `..`, no control characters) before it is used as a registry name.

### Fixed
- Guide labels lost their styling because of a broken CSS rule.

## [0.5.1] - 2026-10-29

### Changed
- Inter (bundled with the app) replaces Segoe UI as the interface font, in our own UI and in the Fluent controls.
- Overview: the live memory figure no longer wraps ("14 GB / 32 GB" on one line); "Right now" and hardware are no longer cards inside a card; tighter spacing; hardware labels are plain text instead of spaced capitals.
- Notices and irreversible rows no longer use a coloured side bar; progress meters animate with a transform.

## [0.5.0] - 2026-10-29

### Added
- Guide page: what only you can do (BIOS memory profile and Resizable BAR, dual channel, SSD, cooling, drivers, refresh rate, in-game settings), and a "fresh start" section with how to reinstall Windows 10 or 11, a note on Windows 10 having reached end of support, and AtlasOS for enthusiasts. In English and Turkish.
- Overview recognises AtlasOS and ReviOS from the OEM entries their installers write, shows the Windows edition and feature update, and explains what that means for Zanrei. Windows 10 gets a notice that it no longer receives free security updates.
- Overview hardware shown as cards, with how full each drive is.

### Changed
- New logo and icons.

## [0.4.0] - 2026-10-29

### Added
- First-run opening: the logo is drawn in with a light sweep before the setup starts (skippable, reduced-motion aware), and the setup shows named steps.
- Startup programs page: Run keys and Startup folders, switched on and off through the same flag Task Manager uses, journaled so it can be undone.
- Disk cleanup on the Cleanup page: measures first, deletes only the ticked items (temp files, crash dumps, update leftovers, delivery cache, browser caches, Recycle Bin). Replaces the old one-button temp cleaner.
- Live numbers on the Overview (processor, memory, processes, startup programs).
- Restore points can be deleted from the Restore page (one or all), including the matching Windows restore point.
- New optimizations: group Windows services into fewer processes (low-RAM PCs), turn off power throttling, give games priority over background media, favour the foreground program, turn off memory integrity (VBS, advanced).
- Game detection: Battle.net, Riot Games, Rockstar, Bethesda and Activision games; GOG primary executable from the game's own file; Xbox executable and name from `MicrosoftGame.config`; Steam installs that are still downloading, Epic add-ons and Unreal Engine are skipped; both Steam library lists are read.
- Game Boost recognises a game by the folder its process runs from (and ignores crash handlers and launchers), shows the game's name, and recreates the High performance plan on laptops that hide it.

### Changed
- New logo and palette: brushed silver on black, taken from the logo. New app and tray icons.
- The window has a fixed size (fitted to small screens), a minimize button for the taskbar and a close button. Close keeps Zanrei in the tray when background mode is on and setup is done; otherwise it exits.
- Loading states are skeletons instead of spinners.
- The game list's expand arrow sits at the far end of the row.
- Removing Edge can no longer be switched off: it is irreversible like removing apps, needs an explicit acknowledgement, and is never offered automatically. Irreversible items never appear in the restore list.
- The restore-point strip is gone from the sidebar; the Restore page is under Tools.

### Fixed
- After undoing or deleting the current session's restore point, the next change failed until the app was restarted.

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
