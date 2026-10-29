import { type BrandVariants, createDarkTheme, type Theme } from "@fluentui/react-components";

// Brand colours live here (single source of truth), taken from the logo: brushed silver on black.
// Silver is the accent everywhere an interface would normally use blue: buttons, switches, selection,
// focus, links. Surfaces are near-black with a faint cool cast. Green/amber/red stay as status colours only.
export const ACCENT = "#D4D8DF";
const ACCENT_HOVER = "#E6E9ED";
const ACCENT_PRESSED = "#B9BEC8";
const ACCENT_TEXT = "#E3E6EB"; // accent text on dark surfaces

const brand: BrandVariants = {
  10: "#0B0C0E", 20: "#17191D", 30: "#24272D", 40: "#33373E", 50: "#454A53", 60: "#595F6A", 70: "#6F7682", 80: "#878E9A",
  90: "#A0A7B2", 100: "#B4BAC4", 110: "#C5CAD2", 120: "#D3D7DD", 130: "#E0E3E8", 140: "#EBEDF0", 150: "#F4F5F7", 160: "#FAFAFB",
};

const base = createDarkTheme(brand);

export const theme: Theme = {
  ...base,
  colorNeutralBackground1: "#141417",
  colorNeutralBackground2: "#0F0F12",
  colorNeutralBackground3: "#0A0A0C",
  colorNeutralForeground1: "#EEF0F3",
  colorNeutralForeground2: "#D3D6DC",
  colorNeutralForeground3: "#BABEC6",
  colorNeutralStrokeAccessible: "#A3A8B2",
  colorBrandBackground: ACCENT,
  colorBrandBackgroundHover: ACCENT_HOVER,
  colorBrandBackgroundPressed: ACCENT_PRESSED,
  colorBrandBackgroundSelected: ACCENT,
  colorNeutralForegroundOnBrand: "#0A0A0C", // dark text on the light silver passes AA with room to spare
  colorBrandForeground1: ACCENT_TEXT,
  colorBrandForeground2: ACCENT_TEXT,
  colorBrandForegroundLink: ACCENT_TEXT,
  colorBrandForegroundLinkHover: "#FFFFFF",
  colorBrandForegroundLinkPressed: ACCENT_HOVER,
  colorCompoundBrandBackground: ACCENT,
  colorCompoundBrandBackgroundHover: ACCENT_HOVER,
  colorCompoundBrandBackgroundPressed: ACCENT_PRESSED,
  colorCompoundBrandForeground1: ACCENT_TEXT,
  colorCompoundBrandForeground1Hover: "#FFFFFF",
  colorCompoundBrandStroke: ACCENT,
  colorCompoundBrandStrokeHover: ACCENT_HOVER,
  colorBrandStroke1: ACCENT,
  colorStrokeFocus2: "#EEF0F3",
  colorStatusSuccessForeground1: "#3DDC97",
  colorStatusWarningForeground1: "#FFC94D",
  colorStatusDangerForeground1: "#FF5C5C",
};
