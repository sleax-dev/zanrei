import { type BrandVariants, createDarkTheme, type Theme } from "@fluentui/react-components";

// Brand colours live here (single source of truth). Orange is reserved for buttons and the logo; everything else
// that Fluent would tint with the brand (links, focus, toggles, selection) uses the secondary blue.
const ORANGE = "#FF6A1A";
const BLUE = "#2074BA";

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
  colorBrandBackground: ORANGE,
  colorBrandBackgroundHover: "#FF7E33",
  colorBrandBackgroundPressed: "#E05606",
  colorBrandBackgroundSelected: ORANGE,
  colorNeutralForegroundOnBrand: "#0B0B10", // white on #FF6A1A is only ~2.9:1; dark text passes AA
  colorBrandForeground1: BLUE,
  colorBrandForeground2: BLUE,
  colorBrandForegroundLink: "#5BA3E0",
  colorBrandForegroundLinkHover: "#7DB8EA",
  colorBrandForegroundLinkPressed: "#4A93D0",
  colorCompoundBrandBackground: BLUE,
  colorCompoundBrandBackgroundHover: "#2B84D0",
  colorCompoundBrandBackgroundPressed: "#1A5F99",
  colorCompoundBrandForeground1: "#5BA3E0",
  colorCompoundBrandStroke: BLUE,
  colorBrandStroke1: BLUE,
  colorStrokeFocus2: "#F4F1EA",
  colorStatusSuccessForeground1: "#3DDC97",
  colorStatusWarningForeground1: "#FFC94D",
  colorStatusDangerForeground1: "#FF4D4D",
};
