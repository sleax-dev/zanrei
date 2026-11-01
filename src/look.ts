import { type BrandVariants, createDarkTheme, type Theme } from "@fluentui/react-components";
import { theme as silverTheme } from "./theme";

// The look the user picks: an accent colour and an optional background picture. Plain CSS reads the accent from
// custom properties on :root; Fluent UI gets a theme built from the same colour.

/** The preset accents. The first is Zanrei's own silver. */
export const ACCENTS = ["#d4d8df", "#6fe0c3", "#6aa8ff", "#9d8cff", "#ff7eb6", "#ff6b6b", "#ffa65c", "#ffd166", "#5ee08b"];
export const DEFAULT_ACCENT = ACCENTS[0];

type Rgb = [number, number, number];

function parse(hex: string): Rgb | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const toHex = (c: Rgb) => "#" + c.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const WHITE: Rgb = [255, 255, 255];
const BLACK: Rgb = [10, 10, 12];

/** WCAG relative luminance, 0 (black) to 1 (white). */
function luminance([r, g, b]: Rgb) {
  const lin = (v: number) => ((v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

/** An accent that reads on the near-black surfaces: a too-dark pick is lifted until it does. */
function readable(c: Rgb): Rgb {
  let out = c;
  for (let i = 0; i < 10 && luminance(out) < 0.18; i++) out = mix(out, WHITE, 0.15);
  return out;
}

/** The accent to use: the picture's when asked and it has one, else the chosen colour, made readable. */
export async function resolveAccent(accent: string, picture: string, fromPicture: boolean): Promise<string> {
  let c = parse(accent) ?? parse(DEFAULT_ACCENT)!;
  if (picture && fromPicture) c = (await pictureAccent(picture)) ?? c;
  return toHex(readable(c));
}

/** Sets the custom properties the CSS reads: the accent and, with a picture, the picture itself. */
export function applyCss(accent: string, picture: string, blur: boolean, dim: number) {
  const c = parse(accent)!;
  const root = document.documentElement.style;
  root.setProperty("--accent", accent);
  root.setProperty("--accent-rgb", c.join(" "));
  if (picture) {
    root.setProperty("--bg-image", `url("${picture}")`);
    root.setProperty("--bg-blur", blur ? "28px" : "0px");
    root.setProperty("--bg-dim", String(Math.min(0.9, Math.max(0, dim))));
  } else {
    root.removeProperty("--bg-image");
  }
  document.documentElement.classList.toggle("has-picture", !!picture);
}

/** The Fluent theme for an accent: Zanrei's hand-tuned silver theme, or one built the same way around another colour. */
export function fluentTheme(accent: string): Theme {
  if (accent.toLowerCase() === DEFAULT_ACCENT) return silverTheme;
  const c = parse(accent)!;
  // 16 steps from near-black through the accent (at 110) to near-white, as Fluent's brand ramps run.
  const brand = Object.fromEntries(
    [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160].map((step) => {
      const t = step / 110;
      return [step, toHex(t <= 1 ? mix(BLACK, c, t) : mix(c, WHITE, (step - 110) / 60))];
    }),
  ) as unknown as BrandVariants;
  const hover = toHex(mix(c, WHITE, 0.2));
  const pressed = toHex(mix(c, BLACK, 0.15));
  const onAccent = luminance(c) > 0.36 ? "#0A0A0C" : "#FFFFFF";
  const base = createDarkTheme(brand);
  return {
    ...base,
    // Neutrals, fonts and status colours stay as in the silver theme; only the brand colour changes.
    ...Object.fromEntries(Object.entries(silverTheme).filter(([k]) => !/Brand/.test(k) && k !== "colorNeutralForegroundOnBrand")),
    colorBrandBackground: accent,
    colorBrandBackgroundHover: hover,
    colorBrandBackgroundPressed: pressed,
    colorBrandBackgroundSelected: accent,
    colorNeutralForegroundOnBrand: onAccent,
    colorBrandForeground1: accent,
    colorBrandForeground2: hover,
    colorBrandForegroundLink: accent,
    colorBrandForegroundLinkHover: hover,
    colorBrandForegroundLinkPressed: pressed,
    colorCompoundBrandBackground: accent,
    colorCompoundBrandBackgroundHover: hover,
    colorCompoundBrandBackgroundPressed: pressed,
    colorCompoundBrandForeground1: accent,
    colorCompoundBrandForeground1Hover: hover,
    colorCompoundBrandStroke: accent,
    colorCompoundBrandStrokeHover: hover,
    colorBrandStroke1: accent,
  } as Theme;
}

/** The picture's most colourful hue: saturated, bright pixels vote for one of 36 hue buckets. */
async function pictureAccent(src: string): Promise<Rgb | null> {
  const img = new Image();
  img.src = src;
  await img.decode().catch(() => undefined);
  if (!img.naturalWidth) return null;
  const size = 48;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(img, 0, 0, size, size);
  const data = ctx.getImageData(0, 0, size, size).data;
  const buckets = Array.from({ length: 36 }, () => ({ weight: 0, sum: [0, 0, 0] as Rgb }));
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const s = max ? (max - min) / max : 0;
    const v = max / 255;
    if (s < 0.25 || v < 0.25) continue; // greys and shadows say nothing about the picture's colour
    const d = max - min;
    let h = max === r ? (g - b) / d : max === g ? 2 + (b - r) / d : 4 + (r - g) / d;
    h = (h * 60 + 360) % 360;
    const bucket = buckets[Math.floor(h / 10) % 36];
    const w = s * v;
    bucket.weight += w;
    bucket.sum[0] += r * w;
    bucket.sum[1] += g * w;
    bucket.sum[2] += b * w;
  }
  const best = buckets.reduce((a, b) => (b.weight > a.weight ? b : a));
  if (best.weight === 0) return null;
  return best.sum.map((v) => v / best.weight) as Rgb;
}

/** Reads a picture the user picked and shrinks it to at most 2560 px: a few hundred KB of JPEG. */
export async function loadPicture(file: File): Promise<string> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const scale = Math.min(1, 2560 / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(img.naturalWidth * scale);
    canvas.height = Math.round(img.naturalHeight * scale);
    canvas.getContext("2d")!.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.88);
  } finally {
    URL.revokeObjectURL(url);
  }
}
