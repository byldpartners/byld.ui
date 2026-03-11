import type { ThemePreset } from "@byldpartners/ui";

export const oceanPreset: ThemePreset = {
  name: "ocean",
  tokens: {
    colors: {
      background: "oklch(0.15 0.03 230)",
      foreground: "oklch(0.93 0.02 220)",
      card: "oklch(0.19 0.035 230)",
      cardForeground: "oklch(0.93 0.02 220)",
      popover: "oklch(0.19 0.035 230)",
      popoverForeground: "oklch(0.93 0.02 220)",
      primary: "oklch(0.70 0.14 220)",
      primaryForeground: "oklch(0.13 0.03 230)",
      secondary: "oklch(0.30 0.06 200)",
      secondaryForeground: "oklch(0.90 0.02 210)",
      muted: "oklch(0.25 0.03 230)",
      mutedForeground: "oklch(0.62 0.04 220)",
      accent: "oklch(0.28 0.04 230)",
      accentForeground: "oklch(0.93 0.02 220)",
      destructive: "oklch(0.65 0.22 15)",
      destructiveForeground: "oklch(0.95 0.01 15)",
      border: "oklch(0.28 0.04 230)",
      input: "oklch(0.28 0.04 230)",
      ring: "oklch(0.60 0.12 220)",
    },
    radius: {
      sm: "0.375rem",
      md: "0.625rem",
      lg: "0.875rem",
      xl: "1.25rem",
      full: "9999px",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
    },
    typography: {
      fontFamily:
        'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontFamilyMono:
        'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
    },
  },
};
