// Fails when the UI uses a translation key that a language lacks, when a language is missing an English key or a
// plural form it needs (Intl.PluralRules), or when a tweak has no text.
// Run with: node --experimental-strip-types scripts/check-i18n.mjs
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import en from "../src/i18n/locales/en.ts";
import { ATLAS_FACTS, FRESH_GAINS, GROUPS, INSTALL_STEPS, ITEMS } from "../src/guide.ts";

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
const PAGES = ["overview", "privacy", "performance", "startup", "gaming", "windows", "cleanup", "library", "graphics", "guide", "restore", "logs", "settings"];
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
const DISK = ["temp", "windows_temp", "crash_dumps", "update_cache", "delivery_cache", "browser_cache", "recycle_bin"];
for (const d of DISK) ["name", "desc"].forEach((k) => keys.add(`disk.item.${d}.${k}`));
for (const k of ["User", "AllUsers"]) keys.add(`startup.scope.${k}`);
for (const k of ["welcome", "recommend", "done"]) keys.add(`setup.steps.${k}`);
for (const o of ["gpu", "fso", "priority"]) ["name", "desc"].forEach((k) => keys.add(`games.opt.${o}.${k}`));
for (const m of ["manual", "recommended", "auto"]) ["name", "desc"].forEach((k) => keys.add(`setup.mode.${m}.${k}`));

for (const i of ITEMS) {
  const ks = ["title", "why", ...Array.from({ length: i.steps }, (_, n) => `s${n + 1}`), ...(i.caution ? ["caution"] : [])];
  ks.forEach((k) => keys.add(`guide.items.${i.id}.${k}`));
  keys.add(`guide.impact.${i.impact}`);
  keys.add(`guide.effort.${i.effort}`);
  if (i.goto) keys.add(`guide.goto.${i.goto}`);
  for (const l of i.links ?? []) keys.add(`guide.link.${l.key}`);
}
for (const g of GROUPS) ["title", "desc"].forEach((k) => keys.add(`guide.group.${g}.${k}`));
for (const s of INSTALL_STEPS) {
  ["title", "body"].forEach((k) => keys.add(`guide.install.step.${s.id}.${k}`));
  for (const l of s.links ?? []) keys.add(`guide.link.${l.key}`);
}
for (const k of FRESH_GAINS) keys.add(`guide.fresh.gain.${k}`);
for (const k of ATLAS_FACTS) keys.add(`guide.atlas.fact.${k}`);
for (const k of ["site", "docs", "github", "youtube", "win10Ended", "requirements"]) keys.add(`guide.link.${k}`);

const at = (obj, key) => key.split(".").reduce((o, k) => (o && typeof o === "object" ? o[k] : undefined), obj);
// a key with a count has English plural forms (key_one / key_other); other languages may keep a single form
const has = (obj, key) => [key, `${key}_other`].some((k) => at(obj, k) !== undefined);
const flat = (o, p = "") =>
  Object.entries(o).flatMap(([k, v]) => (typeof v === "object" ? flat(v, `${p}${k}.`) : [`${p}${k}`]));
// Every English string, with a plural reduced to its base key.
const enKeys = [...new Set(flat(en).map((k) => k.replace(/_(one|other)$/, "")))];
const plurals = new Set(flat(en).filter((k) => k.endsWith("_other")).map((k) => k.slice(0, -"_other".length)));

const langs = readdirSync("src/i18n/locales").map((f) => f.replace(/\.ts$/, ""));
let bad = 0;
for (const lang of langs) {
  const locale = (await import(`../src/i18n/locales/${lang}.ts`)).default;
  const forms = new Intl.PluralRules(lang).resolvedOptions().pluralCategories;
  const missing = [...new Set([...keys, ...enKeys])].flatMap((k) =>
    plurals.has(k) ? forms.map((f) => `${k}_${f}`).filter((pk) => at(locale, pk) === undefined) : has(locale, k) ? [] : [k],
  );
  if (missing.length) {
    bad += missing.length;
    console.error(`${lang}: ${missing.length} missing\n  ${missing.join("\n  ")}`);
  }
}
const unusedTweaks = Object.keys(en.tweaks).filter((id) => !ids.includes(id));
if (unusedTweaks.length) {
  bad += unusedTweaks.length;
  console.error(`tweak texts without a catalog entry: ${unusedTweaks.join(", ")}`);
}
console.log(`${langs.length} languages, ${enKeys.length} strings, ${ids.length} tweaks checked`);
process.exit(bad ? 1 : 0);
