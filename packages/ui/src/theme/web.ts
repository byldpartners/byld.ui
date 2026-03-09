"use client";

import { createContext, useContext, useEffect, useState, createElement } from "react";
import type { ThemePreset, ThemeTokens, ThemeColors, ThemeRadius, ThemeSpacing } from "./theme.types";
import { defaultPreset } from "./presets/default";
import { darkPreset } from "./presets/dark";

// --- CSS Variable Generation ---

function colorToCssVar(key: string): string {
  // camelCase → kebab-case
  return `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}

function radiusToCssVar(key: string): string {
  return `--radius-${key}`;
}

function spacingToCssVar(key: string): string {
  return `--spacing-${key}`;
}

function generateCssVars(tokens: ThemeTokens): Record<string, string> {
  const vars: Record<string, string> = {};

  for (const [key, value] of Object.entries(tokens.colors)) {
    vars[colorToCssVar(key)] = value;
  }
  for (const [key, value] of Object.entries(tokens.radius)) {
    vars[radiusToCssVar(key)] = value;
  }
  for (const [key, value] of Object.entries(tokens.spacing)) {
    vars[spacingToCssVar(key)] = value;
  }
  vars["--font-family"] = tokens.typography.fontFamily;
  vars["--font-family-mono"] = tokens.typography.fontFamilyMono;

  return vars;
}

function applyCssVars(vars: Record<string, string>, element: HTMLElement = document.documentElement) {
  for (const [key, value] of Object.entries(vars)) {
    element.style.setProperty(key, value);
  }
}

// --- Theme Context ---

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

// --- ThemeProvider ---

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

  useEffect(() => {
    const vars = generateCssVars(tokens);
    applyCssVars(vars);
  }, [tokens]);

  const setTheme = (name: string) => {
    if (presetMap.has(name)) {
      setThemeName(name);
    } else {
      console.warn(`Theme "${name}" not found. Available: ${Array.from(presetMap.keys()).join(", ")}`);
    }
  };

  return createElement(
    ThemeContext.Provider,
    { value: { theme: themeName, setTheme, tokens } },
    children,
  );
}

export { defaultPreset, darkPreset };
export type { ThemePreset, ThemeTokens, ThemeColors, ThemeRadius, ThemeSpacing };
