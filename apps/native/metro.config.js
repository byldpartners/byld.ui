const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so Metro sees packages/ui source files
config.watchFolders = [monorepoRoot];

const finalConfig = withUniwindConfig(config, {
  cssEntryFile: "./global.css",
});

// Uniwind's nativeResolver caches the path to its own components dir
// to prevent infinite recursion when replacing react-native imports.
// In a pnpm monorepo, packages/ui resolves a DIFFERENT copy of uniwind
// (via its own node_modules symlink), so the guard fails → infinite loop.
//
// Fix: wrap the resolver to redirect uniwind and react-native imports
// from packages/ui to the app's node_modules BEFORE uniwind's resolver runs.
const uiPackageRoot = path.resolve(monorepoRoot, "packages/ui");
const uniwindResolver = finalConfig.resolver.resolveRequest;

finalConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (context.originModulePath.startsWith(uiPackageRoot)) {
    if (
      moduleName === "react-native" ||
      moduleName.startsWith("react-native/") ||
      moduleName === "uniwind" ||
      moduleName.startsWith("uniwind/") ||
      moduleName === "react" ||
      moduleName.startsWith("react/")
    ) {
      // Rewrite context so the resolver looks in the app's node_modules
      const rewrittenContext = {
        ...context,
        originModulePath: path.resolve(projectRoot, "_virtual.js"),
      };
      return uniwindResolver(rewrittenContext, moduleName, platform);
    }
  }
  return uniwindResolver(context, moduleName, platform);
};

module.exports = finalConfig;
