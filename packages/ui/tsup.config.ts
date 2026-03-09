import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "theme/web": "src/theme/web.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  splitting: true,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "react-native",
    "uniwind",
  ],
  esbuildOptions(options) {
    // Exclude .native.tsx files from web builds
    options.conditions = ["browser", "import"];
  },
  // Only include web files in the bundle
  ignoreWatch: ["**/*.native.tsx", "**/*.native.ts"],
});
