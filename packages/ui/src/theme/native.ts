/**
 * Native theme system — powered by uniwind.
 *
 * With uniwind, Tailwind classes (including dark: variants and CSS variables)
 * work directly on React Native components via the className prop.
 *
 * Theming is handled the same way as web:
 * - Use Tailwind semantic classes (bg-primary, text-foreground, etc.)
 * - Dark mode via dark: prefix or Tailwind's darkMode config
 * - Custom themes via CSS variables in your global.css
 *
 * This file re-exports theme presets and types for consumers who need
 * to reference token values programmatically (e.g., for charts or animations).
 */

import type { ThemeTokens, ThemePreset } from "./theme.types";
import { defaultPreset } from "./presets/default";
import { darkPreset } from "./presets/dark";

// --- Rem to Number Conversion (for programmatic access) ---

const BASE_FONT_SIZE = 16;

function remToNumber(value: string): number {
  const match = value.match(/^([\d.]+)rem$/);
  if (match) {
    return parseFloat(match[1]) * BASE_FONT_SIZE;
  }
  const pxMatch = value.match(/^([\d.]+)px$/);
  if (pxMatch) {
    return parseFloat(pxMatch[1]);
  }
  return parseFloat(value) || 0;
}

// --- Native Theme Types (for programmatic access) ---

export interface NativeThemeRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface NativeThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
}

export interface NativeTheme {
  radius: NativeThemeRadius;
  spacing: NativeThemeSpacing;
  typography: {
    fontFamily: string;
    fontFamilyMono: string;
  };
}

function tokensToNativeTheme(tokens: ThemeTokens): NativeTheme {
  return {
    radius: {
      sm: remToNumber(tokens.radius.sm),
      md: remToNumber(tokens.radius.md),
      lg: remToNumber(tokens.radius.lg),
      xl: remToNumber(tokens.radius.xl),
      full: remToNumber(tokens.radius.full),
    },
    spacing: {
      xs: remToNumber(tokens.spacing.xs),
      sm: remToNumber(tokens.spacing.sm),
      md: remToNumber(tokens.spacing.md),
      lg: remToNumber(tokens.spacing.lg),
      xl: remToNumber(tokens.spacing.xl),
      "2xl": remToNumber(tokens.spacing["2xl"]),
      "3xl": remToNumber(tokens.spacing["3xl"]),
    },
    typography: { ...tokens.typography },
  };
}

/** Pre-computed numeric values for programmatic use (animations, charts, etc.) */
export const themes = {
  default: tokensToNativeTheme(defaultPreset.tokens),
  dark: tokensToNativeTheme(darkPreset.tokens),
} as const;

export function createNativeTheme(preset: ThemePreset): NativeTheme {
  return tokensToNativeTheme(preset.tokens);
}

export { defaultPreset, darkPreset };
export type { ThemePreset, ThemeTokens };
