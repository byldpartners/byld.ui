/**
 * Generates theme CSS files for web and native from the canonical preset definitions.
 *
 * Delegates to packages/ui/bin/init.cjs (single source of truth for CSS generation).
 *
 * Usage: pnpm generate-theme
 */

import { execSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const bin = join(root, "packages", "ui", "bin", "init.cjs");
const src = join(root, "packages", "ui", "src");

const webPath = join(root, "apps", "web", "src", "app.css");
const nativePath = join(root, "apps", "native", "global.css");

execSync(
  [
    `node "${bin}" generate-theme`,
    `--source "${src}"`,
    `--out-web "${webPath}"`,
    `--web-source "../../../packages/ui/src"`,
    `--web-imports "tw-animate-css"`,
    `--out-native "${nativePath}"`,
    `--native-source "../../packages/ui/src"`,
  ].join(" "),
  { stdio: "inherit" },
);
