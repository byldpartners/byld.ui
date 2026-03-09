import type { ThemePreset } from "../theme.types";
import { baseTokens } from "../tokens";

export const defaultPreset: ThemePreset = {
  name: "default",
  tokens: {
    ...baseTokens,
    colors: {
      background: "oklch(1 0 0)",
      foreground: "oklch(0.145 0 0)",
      card: "oklch(1 0 0)",
      cardForeground: "oklch(0.145 0 0)",
      popover: "oklch(1 0 0)",
      popoverForeground: "oklch(0.145 0 0)",
      primary: "oklch(0.205 0 0)",
      primaryForeground: "oklch(0.985 0 0)",
      secondary: "oklch(0.965 0 0)",
      secondaryForeground: "oklch(0.205 0 0)",
      muted: "oklch(0.965 0 0)",
      mutedForeground: "oklch(0.556 0 0)",
      accent: "oklch(0.965 0 0)",
      accentForeground: "oklch(0.205 0 0)",
      destructive: "oklch(0.577 0.245 27.325)",
      destructiveForeground: "oklch(0.985 0 0)",
      border: "oklch(0.922 0 0)",
      input: "oklch(0.922 0 0)",
      ring: "oklch(0.708 0 0)",
    },
  },
};
