import type { ThemePreset } from "../theme.types";

export const auroraPreset: ThemePreset = {
  name: "aurora",
  tokens: {
    colors: {
      background: "oklch(0.18 0.04 270)",
      foreground: "oklch(0.93 0.01 250)",
      card: "oklch(0.22 0.045 270)",
      cardForeground: "oklch(0.93 0.01 250)",
      popover: "oklch(0.22 0.045 270)",
      popoverForeground: "oklch(0.93 0.01 250)",
      primary: "oklch(0.75 0.15 190)",
      primaryForeground: "oklch(0.15 0.04 270)",
      secondary: "oklch(0.35 0.08 290)",
      secondaryForeground: "oklch(0.90 0.03 290)",
      muted: "oklch(0.28 0.04 270)",
      mutedForeground: "oklch(0.65 0.04 260)",
      accent: "oklch(0.30 0.05 270)",
      accentForeground: "oklch(0.93 0.01 250)",
      destructive: "oklch(0.65 0.22 15)",
      destructiveForeground: "oklch(0.95 0.01 15)",
      border: "oklch(0.26 0.035 270)",
      input: "oklch(0.26 0.035 270)",
      ring: "oklch(0.65 0.12 190)",
    },
    radius: {
      sm: "0.5rem",
      md: "0.75rem",
      lg: "1rem",
      xl: "1.5rem",
      full: "9999px",
    },
    spacing: {
      xs: "0.375rem",
      sm: "0.75rem",
      md: "1.25rem",
      lg: "2rem",
      xl: "2.5rem",
      "2xl": "3.5rem",
      "3xl": "5rem",
    },
    typography: {
      fontFamily:
        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
      fontFamilyMono:
        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },
    shadow: {
      sm: "0 1px 3px 0 oklch(0.55 0.12 190 / 0.3), 0 1px 2px -1px oklch(0.55 0.12 190 / 0.2)",
      md: "0 4px 8px -1px oklch(0.55 0.12 190 / 0.35), 0 2px 4px -2px oklch(0.55 0.12 190 / 0.25)",
      lg: "0 10px 20px -3px oklch(0.55 0.12 190 / 0.4), 0 4px 8px -4px oklch(0.55 0.12 190 / 0.3)",
      xl: "0 20px 30px -5px oklch(0.55 0.12 190 / 0.45), 0 8px 12px -6px oklch(0.55 0.12 190 / 0.35)",
    },
  },
};
