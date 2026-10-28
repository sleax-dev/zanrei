import { locale as osLocale } from "@tauri-apps/plugin-os";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar from "./locales/ar";
import de from "./locales/de";
import en from "./locales/en";
import es from "./locales/es";
import fr from "./locales/fr";
import ja from "./locales/ja";
import pt from "./locales/pt";
import ru from "./locales/ru";
import tr from "./locales/tr";
import zh from "./locales/zh";

/** Adding a language = one file in ./locales (typed against en.ts) + one line here. */
const resources = { en, tr, es, de, fr, pt, ru, zh, ja, ar };

export const LANGUAGES = {
  en: "English",
  tr: "Türkçe",
  es: "Español",
  de: "Deutsch",
  fr: "Français",
  pt: "Português",
  ru: "Русский",
  zh: "中文",
  ja: "日本語",
  ar: "العربية",
} as const;

export type Lang = keyof typeof LANGUAGES;

const RTL: Lang[] = ["ar"];

/** "tr-TR" -> "tr"; anything we don't ship falls back to English. */
export function pickLang(tag?: string | null): Lang {
  const base = tag?.toLowerCase().split(/[-_]/)[0] ?? "";
  return base in LANGUAGES ? (base as Lang) : "en";
}

export function isRtl(lang: string) {
  return RTL.includes(lang as Lang);
}

export async function initI18n(saved?: string | null) {
  const lang = saved ? pickLang(saved) : pickLang(await osLocale().catch(() => navigator.language));
  await i18n.use(initReactI18next).init({
    resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, { translation: v }])),
    lng: lang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
  applyDocLang(lang);
}

function applyDocLang(lang: string) {
  document.documentElement.lang = lang;
  document.documentElement.dir = isRtl(lang) ? "rtl" : "ltr";
}

export async function setLanguage(lang: Lang) {
  await i18n.changeLanguage(lang);
  applyDocLang(lang);
}
