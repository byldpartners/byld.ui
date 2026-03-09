/**
 * Generates theme CSS files for web and native from the canonical preset definitions.
 *
 * Single source of truth: packages/ui/src/theme/presets/*.ts
 *
 * Usage: pnpm generate-theme
 */

import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { defaultPreset } from "../packages/ui/src/theme/presets/default";
import { darkPreset } from "../packages/ui/src/theme/presets/dark";
import { baseTokens } from "../packages/ui/src/theme/tokens";
import type { ThemeColors } from "../packages/ui/src/theme/theme.types";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// --- Helpers ---

function colorKeyToCssVar(key: string): string {
  return `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}

function colorsToLines(colors: ThemeColors, indent: string): string {
  return (Object.entries(colors) as [string, string][])
    .map(([key, value]) => `${indent}${colorKeyToCssVar(key)}: ${value};`)
    .join("\n");
}

// --- Generate web CSS (apps/web/src/app.css) ---

function generateWebCss(): string {
  const lines = [
    "@import \"tailwindcss\";",
    "",
    "@theme {",
    "  /* Colors — generated from packages/ui/src/theme/presets/ */",
    colorsToLines(defaultPreset.tokens.colors, "  "),
    "",
    "  /* Radius */",
    ...Object.entries(baseTokens.radius).map(
      ([key, value]) => `  --radius-${key}: ${value};`,
    ),
    "}",
    "",
  ];

  return lines.join("\n");
}

// --- Generate native CSS (apps/native/global.css) ---

function generateNativeCss(): string {
  const lines = [
    "@import \"tailwindcss\";",
    "@import \"uniwind\";",
    "",
    "@source \"../../packages/ui/src\";",
    "",
    "/* Theme colors — generated from packages/ui/src/theme/presets/ */",
    "",
    "@variant light {",
    colorsToLines(defaultPreset.tokens.colors, "  "),
    "}",
    "",
    "@variant dark {",
    colorsToLines(darkPreset.tokens.colors, "  "),
    "}",
    "",
  ];

  return lines.join("\n");
}

// --- Write files ---

const webCss = generateWebCss();
const nativeCss = generateNativeCss();

const webPath = join(root, "apps/web/src/app.css");
const nativePath = join(root, "apps/native/global.css");

writeFileSync(webPath, webCss, "utf-8");
writeFileSync(nativePath, nativeCss, "utf-8");

console.log(`✓ Generated ${webPath}`);
console.log(`✓ Generated ${nativePath}`);
