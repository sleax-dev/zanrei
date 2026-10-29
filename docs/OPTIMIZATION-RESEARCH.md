# How Zanrei's optimizations were chosen

Zanrei is not the first Windows tuning tool, and most of the popular ones are open source. Before adding anything we
looked at what they ship, what they agree on, and what only one of them does. This document records that comparison,
what Zanrei adopted, and what it left out on purpose.

Star counts are from the GitHub API on 2026-10-29.

## The projects

| Project | Stars | Licence | What it is | What it is good at |
|---|---|---|---|---|
| [ChrisTitusTech/winutil](https://github.com/ChrisTitusTech/winutil) | 65.2k | MIT | PowerShell GUI: tweaks, installs, fixes, updates | Breadth. Large tweak catalogue with a revert for most entries |
| [Raphire/Win11Debloat](https://github.com/Raphire/Win11Debloat) | 61.2k | MIT | One PowerShell script | App removal, privacy, AI features, Start/taskbar/Explorer cosmetics |
| [Atlas-OS/Atlas](https://github.com/Atlas-OS/Atlas) | 21.9k | GPL-3.0 | A modified Windows playbook | Performance and latency; each tweak is a small documented YAML file |
| [hellzerg/optimizer](https://github.com/hellzerg/optimizer) | 18.2k | GPL-3.0 | WinForms utility (superseded by OptimizerNXT) | Services, telemetry, startup programs, drive and browser cleanup |
| [Sycnex/Windows10Debloater](https://github.com/Sycnex/Windows10Debloater) | 18.8k | MIT | Script | App removal. Not updated since 2023 |
| [JosefNemec/Playnite](https://github.com/JosefNemec/Playnite) | 14.4k | MIT | Game library manager | Finding installed games by reading each launcher's own data |
| [farag2/Sophia-Script](https://github.com/farag2/Sophia-Script-for-Windows) | 9.8k | MIT | PowerShell module | Fine-grained, well documented Windows 10/11 settings |
| [bleachbit/bleachbit](https://github.com/bleachbit/bleachbit) | 7.3k | GPL-3.0 | Cleaner | Disk cleanup with a preview of what will be removed |
| [undergroundwires/privacy.sexy](https://github.com/undergroundwires/privacy.sexy) | 6.2k | AGPL-3.0 | Script generator | Privacy; every script shows what it does and how to revert it |
| [valleyofdoom/PC-Tuning](https://github.com/valleyofdoom/PC-Tuning) | 0.8k | GPL-3.0 | Written guide | Tuning explained with reasoning; useful as a sanity check |

### What they have in common

- **Privacy and telemetry**, **app removal**, **services set to manual**, **visual effects off**, **hibernation**
  and **temporary file cleanup** appear almost everywhere. Zanrei covers all of them.
- Most are one-way scripts. A few (winutil, privacy.sexy, Sophia) offer a revert, and winutil can create a
  restore point on request. None makes the restore point mandatory and journals every value it touched, so that one
  snapshot can be undone from inside the app. That mandatory undo is Zanrei's reason to exist.

### What only some of them do

| Item | Who | Zanrei |
|---|---|---|
| Group services into fewer `svchost` processes (`SvcHostSplitThresholdInKB`, or `SvcHostSplitDisable` per service) | winutil, Atlas | **Added** (`svchost_split`). Microsoft documents both switches; it saves memory and dozens of processes on 4 to 8 GB PCs |
| `SystemResponsiveness` = 10 (less CPU held back for background multimedia) | Atlas | **Added** (`multimedia_scheduler`) |
| `Win32PrioritySeparation` = 0x26 (short slices, strongest foreground boost) | Atlas | **Added** (`foreground_priority`), recommended only for older PCs |
| Startup program manager | Optimizer, Task Manager | **Added** as its own page, using the `StartupApproved` flag so nothing is deleted |
| Disk cleanup with a preview | BleachBit | **Added**: measure first, tick, confirm. Zanrei also states plainly that it cannot be undone |
| Game detection from launcher manifests | Playnite | **Improved**: Steam, Epic, GOG, Ubisoft, EA, Xbox, Riot, Battle.net, Rockstar, Bethesda, Activision, plus custom |
| Disable Fault Tolerant Heap | Atlas | Left out: only matters for programs that keep crashing |
| Disable Fast Startup | Win11Debloat | Left out: it trades a slightly slower boot for a "real" shutdown; not a performance win |
| Disable HPET / dynamic tick (`bcdedit`) | Optimizer, guides | Left out: results vary by CPU and chipset, can hurt, and a wrong value affects boot |
| Disable the page file | Atlas | Left out: risks crashes on low-RAM PCs, the group Zanrei most wants to help |
| Disable Spectre/Meltdown mitigations | various | Left out: a real security cost for a gain that depends on the CPU |
| Standby-list or working-set "RAM cleaners" | commercial boosters | Left out, in our judgement: Windows already trims memory under pressure, and forcing it can cause page-ins that cost more than they save |
| Stop automatic Windows updates | Optimizer | Left out: not a performance setting, and unsafe to offer casually |

### Added with a warning: memory integrity (VBS)

Windows 11 can run parts of itself inside a virtual machine ("memory integrity", virtualization-based security).
It has been reported to cost frame rates in some games on some CPUs. Turning it off
removes a layer of protection, so Zanrei offers it as an **advanced** setting, never recommends it, and says so in
the description.

## Game detection

Guessing from folder names is how simple tools get it wrong. Zanrei now reads what each launcher already knows:

| Launcher | Source |
|---|---|
| Steam | `appmanifest_*.acf` in every library from both `libraryfolders.vdf` files; installs that are still downloading are skipped (`StateFlags`) |
| Epic Games | `Manifests/*.item`; incomplete installs, add-ons and Unreal Engine itself are skipped |
| GOG | Registry plus the game's own `goggame-*.info` (the primary play task is the executable) |
| Ubisoft Connect, EA app | Launcher registry keys |
| Xbox / Microsoft Store | `MicrosoftGame.config` for the executable and display name |
| Riot Games | `product_settings.yaml` per product |
| Battle.net, Rockstar, Bethesda, Activision, Wargaming | The Windows uninstall list, filtered by publisher, with launchers and clients excluded by name |
| Anything else | Added by hand |

Installers, redistributables, crash handlers, anti-cheat, engine folders and tiny stubs are never picked as "the game".

Telling that a game is *running* is separate from finding it. Game Boost now matches a process when it is one of the
game's known executables **or** runs from inside the game's folder, so a differently named binary still counts.
Crash handlers, helpers and launchers never trigger it, and a game added by hand matches by name only (its folder,
often Downloads, says nothing about other programs).

## What actually helps a weak PC

Ordered by how much we expect them to matter, with the honest caveat that **we have not benchmarked them**. That is why
the Overview now shows live processor, memory, process-count and startup numbers: compare them yourself before and
after a restart.

1. **Fewer things starting with Windows.** Usually the largest, most reliable change on an older PC. (Startup page.)
2. **Fewer background processes and services.** Background apps off, Edge preloading off, OneDrive and widgets off,
   telemetry services off, service grouping on low-RAM machines.
3. **Freeing disk space** on small or nearly full drives. (Disk cleanup.)
4. **Visual effects off.** Transparency and animations cost the most on integrated graphics.
5. **Power plan.** High performance while gaming (Game Boost), recreated on laptops that hide it.
6. **Per-game settings.** Run on the high-performance GPU, higher CPU priority, fullscreen optimizations.
7. **Scheduler tweaks** (`SystemResponsiveness`, foreground boost). Small, free and reversible.
8. **Memory integrity off** on PCs where it costs frames, accepting the security trade-off.

Not a substitute for hardware: a driver that is two years old (shown on the Graphics page), an HDD instead of an SSD,
or 4 GB of RAM will not be fixed by registry values.

## Candidates not built yet

- Process priority management during Game Boost (lower background processes, restore afterwards).
- Per-vendor graphics driver profiles.
- Timer resolution and Multiplane Overlay switches, behind clear "only if you have this problem" text.
- A before/after report saved at setup and compared later.
