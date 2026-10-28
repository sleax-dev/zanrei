/** Dates in the user's language, without seconds ("Oct 28, 2026, 3:06 PM"). */
export const fmtDateTime = (unixSeconds: number, lang: string) =>
  new Date(unixSeconds * 1000).toLocaleString(lang, { dateStyle: "medium", timeStyle: "short" });

export const fmtClock = (unixMs: number, lang: string) =>
  new Date(unixMs).toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit", second: "2-digit" });

export const fmtDay = (unixMs: number, lang: string) => new Date(unixMs).toLocaleDateString(lang, { dateStyle: "medium" });

/** Compact form for tight spots ("10/28/26, 3:06 PM"). */
export const fmtShort = (unixSeconds: number, lang: string) =>
  new Date(unixSeconds * 1000).toLocaleString(lang, { dateStyle: "short", timeStyle: "short" });
