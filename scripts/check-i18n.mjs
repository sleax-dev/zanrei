// Fails when the UI uses a translation key that English or Turkish lack, or when a tweak has no text.
// Run with: node --experimental-strip-types scripts/check-i18n.mjs
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import en from "../src/i18n/locales/en.ts";
import tr from "../src/i18n/locales/tr.ts";

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const sources = walk("src").filter((f) => /\.tsx?$/.test(f) && !f.includes("/locales/"));

const keys = new Set();
for (const f of sources) {
  for (const m of readFileSync(f, "utf8").matchAll(/\bt\(\s*"([A-Za-z0-9_.]+)"/g)) keys.add(m[1]);
}
const catalog = readFileSync("crates/core/src/tweaks/catalog.rs", "utf8");
const ids = [...catalog.matchAll(/(?:\bt\(\s*|id:\s*)"([a-z_]+)"/g)].map((m) => m[1]);
for (const id of ids) ["name", "desc"].forEach((k) => keys.add(`tweaks.${id}.${k}`));

// keys built at runtime, listed here so they are checked too
const PAGES = ["overview", "privacy", "performance", "gaming", "windows", "cleanup", "library", "graphics", "restore", "logs", "settings"];
const dynamic = {
  restart: ["Explorer", "SignOut", "Reboot"],
  "optimize.risk": ["Safe", "Moderate", "Advanced"],
  "optimize.needs": ["Explorer", "SignOut", "Reboot"],
  "optimize.confirm": ["Safe", "Moderate", "Advanced"],
  "optimize.category": ["Privacy", "Performance", "Gaming", "Interface", "System", "Cleanup"],
  nav: PAGES,
  pageDesc: PAGES.filter((p) => p !== "overview"),
  "overview.tier": ["Legacy", "Mainstream", "High"],
  "logs.level": ["all", "Info", "Warn", "Error"],
};
for (const [p, list] of Object.entries(dynamic)) list.forEach((k) => keys.add(`${p}.${k}`));
for (const o of ["gpu", "fso", "priority"]) ["name", "desc"].forEach((k) => keys.add(`games.opt.${o}.${k}`));
for (const m of ["manual", "recommended", "auto"]) ["name", "desc"].forEach((k) => keys.add(`setup.mode.${m}.${k}`));

const at = (obj, key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), obj);
// a key with a count has English plural forms (key_one / key_other); other languages may keep a single form
const has = (obj, key) => [key, `${key}_other`].some((k) => at(obj, k) !== undefined);
let bad = 0;
for (const [name, locale] of [["en", en], ["tr", tr]]) {
  const missing = [...keys].filter((k) => !has(locale, k));
  if (missing.length) {
    bad += missing.length;
    console.error(`${name}: ${missing.length} missing\n  ${missing.join("\n  ")}`);
  }
}
const unusedTweaks = Object.keys(en.tweaks).filter((id) => !ids.includes(id));
if (unusedTweaks.length) {
  bad += unusedTweaks.length;
  console.error(`tweak texts without a catalog entry: ${unusedTweaks.join(", ")}`);
}
console.log(`${keys.size} keys, ${ids.length} tweaks checked`);
process.exit(bad ? 1 : 0);
