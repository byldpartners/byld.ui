import { createContext, useContext, useState, useCallback, useEffect, createElement } from "react";
import { Uniwind } from "uniwind";
import type { ThemeTokens, ThemePreset, ThemeColors } from "./theme.types";
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

// --- Color key to CSS variable name ---

function colorKeyToCssVar(key: string): string {
  return `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}

function colorsToVariables(colors: ThemeColors): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(colors)) {
    vars[colorKeyToCssVar(key)] = value;
  }
  return vars;
}

// --- ThemeProvider (mirrors web API) ---

// Map preset names to uniwind theme names ("light" / "dark")
const PRESET_TO_UNIWIND: Record<string, string> = {
  default: "light",
  dark: "dark",
};

interface ThemeContextValue {
  theme: string;
  setTheme: (name: string) => void;
  tokens: ThemeTokens;
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
}

export function ThemeProvider({
  children,
  defaultTheme = "default",
  presets: customPresets,
}: ThemeProviderProps) {
  const presets = customPresets ?? [defaultPreset, darkPreset];
  const presetMap = new Map(presets.map((p) => [p.name, p]));

  const [themeName, setThemeName] = useState(defaultTheme);
  const currentPreset = presetMap.get(themeName) ?? presets[0];
  const tokens = currentPreset.tokens;

  // Initialize both light and dark CSS variables so uniwind has them all
  useEffect(() => {
    for (const preset of presets) {
      const uniwindName = PRESET_TO_UNIWIND[preset.name] ?? "light";
      Uniwind.updateCSSVariables(uniwindName, colorsToVariables(preset.tokens.colors));
    }
  }, [presets]);

  // Switch to the active theme
  useEffect(() => {
    const uniwindTheme = PRESET_TO_UNIWIND[themeName] ?? "light";
    Uniwind.updateCSSVariables(uniwindTheme, colorsToVariables(tokens.colors));
    Uniwind.setTheme(uniwindTheme);
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
    { value: { theme: themeName, setTheme, tokens } },
    children,
  );
}

export { defaultPreset, darkPreset };
export type { ThemePreset, ThemeTokens };
