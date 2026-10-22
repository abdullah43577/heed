export type ColorScheme = "light" | "dark";
export type ThemePreference = "SYSTEM" | "LIGHT" | "DARK";

// The palette in src/global.css, as hex, for `color` props a className cannot
// reach. CSS cannot import TS, so edit both.
export const THEME = {
  light: {
    canvas: "#FFFFFF",
    surface: "#FFFFFF",
    surfaceMuted: "#F7F8FA",
    line: "#ECEDF0",
    lineStrong: "#D9DCE1",
    foreground: "#0B0D12",
    foregroundMuted: "#4B5563",
    foregroundSubtle: "#6B7280",
    foregroundInverse: "#FFFFFF",
    accent: "#0E7A63",
    accentMuted: "#E7F4EF",
    danger: "#B93A32",
    dangerMuted: "#FBEAEA",
  },
  dark: {
    canvas: "#0E0F12",
    surface: "#15171B",
    surfaceMuted: "#1B1E23",
    line: "#262A31",
    lineStrong: "#343943",
    foreground: "#F2F3F5",
    foregroundMuted: "#A9AFBA",
    foregroundSubtle: "#8A909C",
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
    IMPORTANT: "#B45309",
    ROUTINE: "#475569",
    NEWSLETTER: "#4F46E5",
    PROMOTION: "#BE123C",
    UNSURE: "#6B7280",
  },
  dark: {
    NEEDS_REPLY: "#5CC9AE",
    IMPORTANT: "#F0A34A",
    ROUTINE: "#A3AEBF",
    NEWSLETTER: "#8F8CF7",
    PROMOTION: "#F47A93",
    UNSURE: "#9CA3AF",
  },
} as const;

export const TINT_ALPHA = {
  light: { surface: "12", holder: "26" },
  dark: { surface: "26", holder: "3D" },
} as const;

// The tab bar is this tall above the bottom inset; a screen lifting a bar over the keyboard subtracts it.
export const TAB_BAR_HEIGHT = 60;
