import { type BrandVariants, createDarkTheme, type Theme } from "@fluentui/react-components";

// Brand colours live here (single source of truth). Orange is the accent everywhere an interface would
// normally use blue: buttons, switches, selection, focus, links. Neutral surfaces stay near-black.
export const ORANGE = "#FF6A1A";
const ORANGE_HOVER = "#FF7E33";
const ORANGE_PRESSED = "#E05606";
const ORANGE_TEXT = "#FF8E4D"; // orange text on dark surfaces needs to be lighter to stay readable

const brand: BrandVariants = {
  10: "#280F01", 20: "#411902", 30: "#5A2202", 40: "#772E03", 50: "#9A3B04", 60: "#BD4805", 70: "#E05606", 80: "#F9620B",
  90: "#FF6E1A", 100: "#FF7E33", 110: "#FF8E4D", 120: "#FF9E66", 130: "#FFB185", 140: "#FFC8A8", 150: "#FFDFCC", 160: "#FFEFE5",
};

const base = createDarkTheme(brand);

export const theme: Theme = {
  ...base,
  colorNeutralBackground1: "#16161D",
  colorNeutralBackground2: "#111117",
  colorNeutralBackground3: "#0B0B10",
  colorNeutralForeground1: "#F4F1EA",
  colorNeutralForeground2: "#D9D6CF",
  colorNeutralForeground3: "#C4C1BA",
  colorNeutralStrokeAccessible: "#B8B5AE",
  colorBrandBackground: ORANGE,
  colorBrandBackgroundHover: ORANGE_HOVER,
  colorBrandBackgroundPressed: ORANGE_PRESSED,
  colorBrandBackgroundSelected: ORANGE,
  colorNeutralForegroundOnBrand: "#0B0B10", // white on #FF6A1A is only ~2.9:1; dark text passes AA
  colorBrandForeground1: ORANGE_TEXT,
  colorBrandForeground2: ORANGE_TEXT,
  colorBrandForegroundLink: ORANGE_TEXT,
  colorBrandForegroundLinkHover: "#FFA166",
  colorBrandForegroundLinkPressed: ORANGE_HOVER,
  colorCompoundBrandBackground: ORANGE,
  colorCompoundBrandBackgroundHover: ORANGE_HOVER,
  colorCompoundBrandBackgroundPressed: ORANGE_PRESSED,
  colorCompoundBrandForeground1: ORANGE_TEXT,
  colorCompoundBrandForeground1Hover: "#FFA166",
  colorCompoundBrandStroke: ORANGE,
  colorCompoundBrandStrokeHover: ORANGE_HOVER,
  colorBrandStroke1: ORANGE,
  colorStrokeFocus2: "#F4F1EA",
  colorStatusSuccessForeground1: "#3DDC97",
  colorStatusWarningForeground1: "#FFC94D",
  colorStatusDangerForeground1: "#FF4D4D",
};
