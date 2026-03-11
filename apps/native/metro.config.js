const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch the entire monorepo so Metro sees packages/ui source files
config.watchFolders = [monorepoRoot];

config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(monorepoRoot, "node_modules"),
];

// withUniwindConfig must be the outermost wrapper
const finalConfig = withUniwindConfig(config, {
  cssEntryFile: "./global.css",
});

// pnpm creates per-package symlinked node_modules. Uniwind's nativeResolver
// caches a single base path for its recursion guard — when packages/ui resolves
// a different symlinked copy of uniwind, the guard fails → infinite recursion.
//
// Fix: for imports originating from packages/ui, spoof the origin so uniwind's
// resolver sees them as coming from the app (same single copy).
const uiPackageRoot = path.resolve(monorepoRoot, "packages/ui");
const uniwindResolver = finalConfig.resolver.resolveRequest;
const virtualOrigin = path.resolve(projectRoot, "_virtual.js");

finalConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    context.originModulePath.startsWith(uiPackageRoot) &&
    (moduleName === "react-native" ||
      moduleName.startsWith("react-native/") ||
      moduleName === "uniwind" ||
      moduleName.startsWith("uniwind/") ||
      moduleName === "react" ||
      moduleName.startsWith("react/"))
  ) {
    return uniwindResolver(
      { ...context, originModulePath: virtualOrigin },
      moduleName,
      platform,
    );
  }
  return uniwindResolver(context, moduleName, platform);
};

module.exports = finalConfig;
