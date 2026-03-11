import { createContext, useContext, useState, useCallback, useEffect, createElement } from "react";
import { Uniwind } from "uniwind";
import type { ThemeTokens, ThemePreset } from "./theme.types";
import { defaultPreset } from "./presets/default";
import { darkPreset } from "./presets/dark";
import { auroraPreset } from "./presets/aurora";

// --- Rem to Number Conversion (for programmatic access) ---

const BASE_FONT_SIZE = 16;

export function remToNumber(value: string): number {
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
  aurora: tokensToNativeTheme(auroraPreset.tokens),
} as const;

export function createNativeTheme(preset: ThemePreset): NativeTheme {
  return tokensToNativeTheme(preset.tokens);
}

// --- ThemeProvider (mirrors web API) ---

// Map preset names to uniwind base theme ("light" / "dark")
// Custom themes beyond light/dark use updateCSSVariables to override colors at runtime
const PRESET_TO_UNIWIND: Record<string, "dark" | "light"> = {
  default: "light",
  dark: "dark",
  aurora: "dark",
};

// Build CSS variable record from a preset's tokens (for updateCSSVariables).
// Colors are passed as strings (Uniwind's culori parses them to hex).
// Radius/spacing are converted from rem strings to pixel numbers since
// React Native style properties require numeric values.
// Typography is passed as strings (font family names).
function tokensToCssVars(tokens: ThemeTokens): Record<string, string | number> {
  const vars: Record<string, string | number> = {};
  for (const [key, value] of Object.entries(tokens.colors)) {
    vars[`--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`] = value;
  }
  for (const [key, value] of Object.entries(tokens.radius)) {
    vars[`--radius-${key}`] = remToNumber(value);
  }
  for (const [key, value] of Object.entries(tokens.spacing)) {
    vars[`--spacing-${key}`] = remToNumber(value);
  }
  vars["--font-family"] = tokens.typography.fontFamily;
  vars["--font-family-mono"] = tokens.typography.fontFamilyMono;
  if (tokens.shadow) {
    for (const [key, value] of Object.entries(tokens.shadow)) {
      vars[`--shadow-${key}`] = value;
    }
  }
  return vars;
}

// Original CSS vars for each uniwind variant, used to restore after custom theme overrides
const BASE_VARS: Record<string, Record<string, string | number>> = {
  light: tokensToCssVars(defaultPreset.tokens),
  dark: tokensToCssVars(darkPreset.tokens),
};

interface ThemeContextValue {
  theme: string;
  setTheme: (name: string) => void;
  tokens: ThemeTokens;
  glass: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
  presets?: ThemePreset[];
  glass?: boolean;
}

export function useGlass(): boolean {
  const ctx = useContext(ThemeContext);
  return ctx?.glass ?? false;
}

export function ThemeProvider({
  children,
  defaultTheme = "default",
  presets: customPresets,
  glass = false,
}: ThemeProviderProps) {
  const presets = customPresets ?? [defaultPreset, darkPreset, auroraPreset];
  const presetMap = new Map(presets.map((p) => [p.name, p]));

  const [themeName, setThemeName] = useState(defaultTheme);
  const currentPreset = presetMap.get(themeName) ?? presets[0];
  const tokens = currentPreset.tokens;

  // Switch uniwind to the active theme
  // light/dark have CSS vars defined in global.css @variant blocks (generated by pnpm generate-theme)
  // Custom themes (e.g. aurora) piggyback on a base variant then override colors via updateCSSVariables
  useEffect(() => {
    const uniwindTheme = PRESET_TO_UNIWIND[themeName] ?? "light";
    Uniwind.setTheme(uniwindTheme);

    if (themeName !== "default" && themeName !== "dark") {
      // Custom theme: override the base variant's color CSS variables
      const vars = tokensToCssVars(tokens);
      Uniwind.updateCSSVariables(uniwindTheme, vars);
    } else {
      // Built-in theme: restore original CSS variables in case a custom theme mutated them
      const original = BASE_VARS[uniwindTheme];
      if (original) {
        Uniwind.updateCSSVariables(uniwindTheme, original);
      }
    }
  }, [themeName, tokens]);

  const setTheme = useCallback(
    (name: string) => {
      if (presetMap.has(name)) {
        setThemeName(name);
      } else {
        console.warn(
          `Theme "${name}" not found. Available: ${Array.from(presetMap.keys()).join(", ")}`,
        );
      }
    },
    [presetMap],
  );

  return createElement(
    ThemeContext.Provider,
    { value: { theme: themeName, setTheme, tokens, glass } },
    children,
  );
}

export { defaultPreset, darkPreset, auroraPreset };
export type { ThemePreset, ThemeTokens };
