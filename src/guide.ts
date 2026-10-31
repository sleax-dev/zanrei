// The Guide page's content as data. Text lives in the locale files under `guide.items.<id>`:
// title, why, s1..sN (one per step) and, when `caution` is set, caution. scripts/check-i18n.mjs reads this file.

type Impact = "big" | "medium" | "small";
type Effort = "easy" | "medium" | "careful";
export type GuideGroup = "bios" | "hardware" | "drivers" | "windows" | "games";

export interface GuideItem {
  id: string;
  group: GuideGroup;
  /** How much it can help a PC that needs it. Honest, not measured. */
  impact: Impact;
  effort: Effort;
  steps: number;
  caution?: true;
  /** A page inside Zanrei that does part of the work. */
  goto?: "graphics" | "startup" | "library";
  /** Link labels live under `guide.link.<key>`. */
  links?: { key: string; url: string }[];
}

export const GROUPS: GuideGroup[] = ["games", "windows", "drivers", "hardware", "bios"];

export const ITEMS: GuideItem[] = [
  { id: "game_settings", group: "games", impact: "big", effort: "easy", steps: 5, goto: "library" },
  { id: "laptop_power", group: "games", impact: "big", effort: "easy", steps: 3 },
  { id: "refresh_rate", group: "windows", impact: "medium", effort: "easy", steps: 4 },
  { id: "oem_software", group: "windows", impact: "medium", effort: "easy", steps: 4, caution: true, goto: "startup" },
  { id: "browser", group: "windows", impact: "medium", effort: "easy", steps: 4 },
  { id: "overlays", group: "windows", impact: "small", effort: "easy", steps: 3 },
  {
    id: "gpu_driver", group: "drivers", impact: "medium", effort: "easy", steps: 4, caution: true, goto: "graphics",
    links: [
      { key: "nvidia", url: "https://www.nvidia.com/drivers" },
      { key: "amd", url: "https://www.amd.com/en/support" },
      { key: "intel", url: "https://www.intel.com/content/www/us/en/download-center/home.html" },
    ],
  },
  { id: "chipset", group: "drivers", impact: "small", effort: "easy", steps: 3, links: [{ key: "atlasDrivers", url: "https://docs.atlasos.net/post-install/drivers/" }] },
  { id: "disk_health", group: "hardware", impact: "small", effort: "easy", steps: 3, links: [{ key: "crystaldiskinfo", url: "https://crystalmark.info/en/software/crystaldiskinfo/" }] },
  { id: "cooling", group: "hardware", impact: "medium", effort: "medium", steps: 4, caution: true, links: [{ key: "hwinfo", url: "https://www.hwinfo.com/" }] },
  { id: "dual_channel", group: "hardware", impact: "medium", effort: "medium", steps: 4, caution: true },
  { id: "ram_upgrade", group: "hardware", impact: "medium", effort: "medium", steps: 3, caution: true },
  { id: "ssd", group: "hardware", impact: "big", effort: "careful", steps: 4, caution: true },
  { id: "xmp", group: "bios", impact: "big", effort: "medium", steps: 5, caution: true, links: [{ key: "atlasXmp", url: "https://docs.atlasos.net/post-install/hardware/enabling-xmp-or-docp/" }] },
  { id: "rebar", group: "bios", impact: "small", effort: "careful", steps: 4, caution: true, links: [{ key: "atlasRebar", url: "https://docs.atlasos.net/post-install/hardware/resizable-bar/" }] },
];

/** Steps of "reinstall Windows", in order. Text under `guide.install.step.<id>.{title,body}`. */
export const INSTALL_STEPS: { id: string; links?: { key: string; url: string }[] }[] = [
  { id: "backup" },
  { id: "activation" },
  { id: "drivers" },
  {
    id: "media",
    links: [
      { key: "mediaHelp", url: "https://support.microsoft.com/windows/create-installation-media-for-windows-99a58364-8c02-206f-aa6f-40c3b507420d" },
      { key: "win11", url: "https://www.microsoft.com/software-download/windows11" },
      { key: "win10", url: "https://www.microsoft.com/software-download/windows10" },
      { key: "rufus", url: "https://rufus.ie" },
    ],
  },
  { id: "boot" },
  { id: "setup" },
  { id: "drive" },
  { id: "firstrun" },
  { id: "update" },
  { id: "zanrei" },
];

export const ATLAS_FACTS = ["w11", "pro", "revert", "security", "unofficial"] as const;
export const FRESH_GAINS = ["clean", "bloat", "components", "layout", "known"] as const;

export const ATLAS_LINKS = [
  { key: "site", url: "https://atlasos.net" },
  { key: "docs", url: "https://docs.atlasos.net/getting-started/install/before-continuing/" },
  { key: "github", url: "https://github.com/Atlas-OS/Atlas" },
  { key: "youtube", url: "https://www.youtube.com/results?search_query=AtlasOS+install+and+performance" },
];
export const REQUIREMENTS_URL = "https://learn.microsoft.com/en-us/windows/whats-new/windows-11-requirements";
export const WIN10_ENDED_URL = "https://support.microsoft.com/en-us/windows/windows-10-support-has-ended-on-october-14-2025-2ca8b313-1946-43d3-b55c-2b95b107f281";
export const REVIOS_URL = "https://github.com/meetrevision/playbook";
