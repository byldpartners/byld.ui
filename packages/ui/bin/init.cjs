#!/usr/bin/env node

/**
 * CLI for @byldpartners/ui project setup and theme generation.
 *
 * Reads theme presets from the package's src/theme/presets/ directory — single
 * source of truth for all generated CSS.
 *
 * Commands:
 *
 *   init --platform <web|native>
 *     Generates config files for a new consumer project.
 *     - native: global.css + metro.config.js
 *     - web:    app.css
 *
 *   generate-theme --source <path-to-ui-src> --out-web <path> --out-native <path>
 *     Regenerates theme CSS for the monorepo's own apps.
 *     Used by `pnpm generate-theme` at the repo root.
 */

const fs = require("fs");
const path = require("path");

// --- Preset parsing ---

/**
 * Parse color entries from a preset .ts file.
 * Matches lines like:  key: "oklch(...)",
 */
function parseColors(filePath) {
  const src = fs.readFileSync(filePath, "utf-8");
  const colorsMatch = src.match(/colors:\s*\{([\s\S]*?)\}/);
  if (!colorsMatch) {
    console.error(`Could not parse colors from ${filePath}`);
    process.exit(1);
  }
  const colors = {};
  const lineRegex = /(\w+):\s*"([^"]+)"/g;
  let match;
  while ((match = lineRegex.exec(colorsMatch[1])) !== null) {
    colors[match[1]] = match[2];
  }
  return colors;
}

/**
 * Parse radius entries from tokens.ts.
 */
function parseRadius(filePath) {
  const src = fs.readFileSync(filePath, "utf-8");
  const radiusMatch = src.match(/radius:\s*\{([\s\S]*?)\}/);
  if (!radiusMatch) {
    console.error(`Could not parse radius from ${filePath}`);
    process.exit(1);
  }
  const radius = {};
  const lineRegex = /["']?(\w+)["']?:\s*"([^"]+)"/g;
  let match;
  while ((match = lineRegex.exec(radiusMatch[1])) !== null) {
    radius[match[1]] = match[2];
  }
  return radius;
}

// --- Helpers ---

function colorKeyToCssVar(key) {
  return `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}

function colorsToLines(colors, indent) {
  return Object.entries(colors)
    .map(([key, value]) => `${indent}${colorKeyToCssVar(key)}: ${value};`)
    .join("\n");
}

// --- CSS generators ---

function generateNativeCss(lightColors, darkColors, sourcePath) {
  return [
    '@import "tailwindcss";',
    '@import "uniwind";',
    "",
    `@source "${sourcePath}";`,
    "",
    "/* Theme tokens — light */",
    "",
    "@variant light {",
    colorsToLines(lightColors, "  "),
    "}",
    "",
    "/* Theme tokens — dark */",
    "",
    "@variant dark {",
    colorsToLines(darkColors, "  "),
    "}",
    "",
  ].join("\n");
}

function generateWebCss(lightColors, radiusTokens, sourcePath, extraImports) {
  const imports = ['@import "tailwindcss";'];
  if (extraImports) {
    for (const imp of extraImports) {
      imports.push(`@import "${imp}";`);
    }
  }

  return [
    ...imports,
    "",
    `@source "${sourcePath}";`,
    "",
    "@theme {",
    "  /* Colors */",
    colorsToLines(lightColors, "  "),
    "",
    "  /* Radius */",
    ...Object.entries(radiusTokens).map(
      ([key, value]) => `  --radius-${key}: ${value};`
    ),
    "}",
    "",
    "@layer base {",
    "  *, *::before, *::after {",
    "    border-color: var(--color-border);",
    "  }",
    "}",
    "",
  ].join("\n");
}

function generateMetroConfig() {
  return [
    "const { getDefaultConfig } = require('expo/metro-config');",
    "const { withUniwindConfig } = require('uniwind/metro');",
    "",
    "const config = getDefaultConfig(__dirname);",
    "",
    "module.exports = withUniwindConfig(config, {",
    "  cssEntryFile: './global.css',",
    "});",
    "",
  ].join("\n");
}

// --- Arg parsing helper ---

function getArg(args, flag) {
  const idx = args.indexOf(flag);
  return idx !== -1 ? args[idx + 1] : null;
}

// --- CLI ---

const args = process.argv.slice(2);
const command = args[0];

// Resolve preset source directory — default to the package's own src/
const sourceRoot = getArg(args, "--source") || path.join(__dirname, "..", "src");
const presetsDir = path.join(sourceRoot, "theme", "presets");
const tokensFile = path.join(sourceRoot, "theme", "tokens.ts");

const lightColors = parseColors(path.join(presetsDir, "default.ts"));
const darkColors = parseColors(path.join(presetsDir, "dark.ts"));
const radiusTokens = parseRadius(tokensFile);

if (command === "init") {
  // --- External consumer init ---
  const platform = getArg(args, "--platform");

  if (!platform || !["web", "native"].includes(platform)) {
    console.error("Usage: npx byldpartners-ui init --platform <web|native>");
    process.exit(1);
  }

  const cwd = process.cwd();

  if (platform === "native") {
    const cssPath = path.join(cwd, "global.css");
    const metroPath = path.join(cwd, "metro.config.js");

    fs.writeFileSync(
      cssPath,
      generateNativeCss(lightColors, darkColors, "./node_modules/@byldpartners/ui/src"),
      "utf-8"
    );
    console.log(`✓ Created ${path.relative(cwd, cssPath)}`);

    if (fs.existsSync(metroPath)) {
      console.log(
        "⚠ metro.config.js already exists — skipped. Make sure it uses withUniwindConfig (see README)."
      );
    } else {
      fs.writeFileSync(metroPath, generateMetroConfig(), "utf-8");
      console.log(`✓ Created ${path.relative(cwd, metroPath)}`);
    }

    console.log("");
    console.log("Next steps:");
    console.log("  1. Add import './global.css' to your App.tsx");
    console.log("  2. Wrap your app with <ThemeProvider> from @byldpartners/ui");
  } else {
    const cssPath = path.join(cwd, "app.css");

    fs.writeFileSync(
      cssPath,
      generateWebCss(lightColors, radiusTokens, "./node_modules/@byldpartners/ui/src"),
      "utf-8"
    );
    console.log(`✓ Created ${path.relative(cwd, cssPath)}`);

    console.log("");
    console.log("Next steps:");
    console.log("  1. Import './app.css' in your entry file");
    console.log("  2. Wrap your app with <ThemeProvider> from @byldpartners/ui");
  }
} else if (command === "generate-theme") {
  // --- Monorepo theme generation ---
  const outWeb = getArg(args, "--out-web");
  const outNative = getArg(args, "--out-native");
  const webSource = getArg(args, "--web-source");
  const nativeSource = getArg(args, "--native-source");
  const webExtraImports = getArg(args, "--web-imports");

  if (!outWeb && !outNative) {
    console.error(
      "Usage: byldpartners-ui generate-theme --source <ui-src-path> --out-web <path> --out-native <path>"
    );
    process.exit(1);
  }

  if (outWeb) {
    const extras = webExtraImports ? webExtraImports.split(",") : undefined;
    fs.writeFileSync(
      outWeb,
      generateWebCss(lightColors, radiusTokens, webSource || "./node_modules/@byldpartners/ui/src", extras),
      "utf-8"
    );
    console.log(`✓ Generated ${outWeb}`);
  }

  if (outNative) {
    fs.writeFileSync(
      outNative,
      generateNativeCss(lightColors, darkColors, nativeSource || "./node_modules/@byldpartners/ui/src"),
      "utf-8"
    );
    console.log(`✓ Generated ${outNative}`);
  }
} else {
  console.error("Commands:");
  console.error("  init --platform <web|native>           Set up a new project");
  console.error("  generate-theme [options]               Regenerate theme CSS files");
  console.error("");
  console.error("Run with --help after a command for details.");
  process.exit(1);
}
