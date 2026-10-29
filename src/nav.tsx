import {
  Broom24Filled, Broom24Regular, Cube24Filled, Cube24Regular, Gauge24Filled, Gauge24Regular, History24Filled, History24Regular,
  Power24Filled, Power24Regular, Rocket24Filled, Rocket24Regular, Settings24Filled, Settings24Regular, ShieldLock24Filled, ShieldLock24Regular,
  TextBulletListSquare24Filled, TextBulletListSquare24Regular, TopSpeed24Filled, TopSpeed24Regular, Window24Filled, Window24Regular,
  XboxController24Filled, XboxController24Regular, type FluentIcon,
} from "@fluentui/react-icons";
import type { Category } from "./lib/api";

export type Page =
  | "overview" | "privacy" | "performance" | "startup" | "gaming" | "windows" | "cleanup"
  | "library" | "graphics" | "restore" | "logs" | "settings";

/** Pages that list optimizations, and which categories each one shows. */
export const TWEAK_PAGES: Partial<Record<Page, Category[]>> = {
  privacy: ["Privacy"],
  performance: ["Performance"],
  gaming: ["Gaming"],
  windows: ["Interface", "System"],
  cleanup: ["Cleanup"],
};

export const NAV_GROUPS: { label: "optimize" | "games" | "tools" | null; pages: Page[] }[] = [
  { label: null, pages: ["overview"] },
  { label: "optimize", pages: ["privacy", "performance", "startup", "gaming", "windows", "cleanup"] },
  { label: "games", pages: ["library", "graphics"] },
  { label: "tools", pages: ["restore", "logs"] },
];

/** [outline, filled]: the filled one marks the active page. */
export const ICONS: Record<Page, [FluentIcon, FluentIcon]> = {
  overview: [Gauge24Regular, Gauge24Filled],
  privacy: [ShieldLock24Regular, ShieldLock24Filled],
  performance: [TopSpeed24Regular, TopSpeed24Filled],
  startup: [Power24Regular, Power24Filled],
  gaming: [Rocket24Regular, Rocket24Filled],
  windows: [Window24Regular, Window24Filled],
  cleanup: [Broom24Regular, Broom24Filled],
  library: [XboxController24Regular, XboxController24Filled],
  graphics: [Cube24Regular, Cube24Filled],
  restore: [History24Regular, History24Filled],
  logs: [TextBulletListSquare24Regular, TextBulletListSquare24Filled],
  settings: [Settings24Regular, Settings24Filled],
};
