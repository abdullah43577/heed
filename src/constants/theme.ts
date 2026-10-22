export type ColorScheme = "light" | "dark";
export type ThemePreference = "SYSTEM" | "LIGHT" | "DARK";

// The palette in src/global.css, as hex, for `color` props a className cannot
// reach. CSS cannot import TS, so edit both.
export const THEME = {
  light: {
    canvas: "#FAFAFB",
    surface: "#FFFFFF",
    surfaceMuted: "#F3F3F6",
    line: "#EAEAEE",
    lineStrong: "#D5D5DE",
    foreground: "#17171A",
    foregroundMuted: "#7D7D8A",
    foregroundSubtle: "#B4B4BF",
    foregroundInverse: "#FFFFFF",
    accent: "#0E7A63",
    accentMuted: "#E6F4F0",
    danger: "#B93A32",
    dangerMuted: "#FBEAEA",
  },
  dark: {
    canvas: "#0F0F12",
    surface: "#17171B",
    surfaceMuted: "#1F1F24",
    line: "#2A2A31",
    lineStrong: "#3A3A43",
    foreground: "#F4F4F6",
    foregroundMuted: "#9C9CA8",
    foregroundSubtle: "#6E6E7A",
    foregroundInverse: "#FFFFFF",
    accent: "#1F9E80",
    accentMuted: "#12302A",
    danger: "#E08A83",
    dangerMuted: "#3A1A18",
  },
} as const satisfies Record<ColorScheme, Record<string, string>>;

export type ThemeColors = (typeof THEME)[ColorScheme];

export const CATEGORY_COLORS_BY_SCHEME = {
  light: {
    NEEDS_REPLY: "#0E7A63",
    IMPORTANT: "#B7791F",
    ROUTINE: "#5B6B7F",
    NEWSLETTER: "#5B47E8",
    PROMOTION: "#B23A6B",
    UNSURE: "#7D7D8A",
  },
  dark: {
    NEEDS_REPLY: "#5CC9AE",
    IMPORTANT: "#E0A84E",
    ROUTINE: "#9AA8B8",
    NEWSLETTER: "#8B7BF5",
    PROMOTION: "#E27FA8",
    UNSURE: "#9C9CA8",
  },
} as const;

export const TINT_ALPHA = {
  light: { surface: "12", holder: "26" },
  dark: { surface: "26", holder: "3D" },
} as const;

// The tab bar is this tall above the bottom inset; a screen lifting a bar over the keyboard subtracts it.
export const TAB_BAR_HEIGHT = 60;
