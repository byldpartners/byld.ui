# Metro Resolver — pnpm + Uniwind Monorepo Fix

## Problem

Running the native app throws **"Maximum call stack size exceeded"**.

pnpm creates per-package symlinked `node_modules`. Uniwind's `nativeResolver` caches a single `internalBasePath` (from the first `uniwind/components` resolution) as a recursion guard. When code in `packages/ui` imports `react-native`, Metro resolves it through a **different** symlinked copy of uniwind. The `originModulePath` no longer matches the cached base path, the recursion guard fails, and the resolver loops infinitely.

## Fix

A custom resolver wrapper in `metro.config.js` intercepts `react-native`, `react`, and `uniwind` imports that originate from `packages/ui` and spoofs `originModulePath` to point inside `apps/native` before passing to uniwind's resolver. This ensures all resolutions go through the app's single copy of each dependency.

```js
finalConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    context.originModulePath.startsWith(uiPackageRoot) &&
    (moduleName === "react-native" || moduleName === "uniwind" || moduleName === "react" || ...)
  ) {
    return uniwindResolver(
      { ...context, originModulePath: virtualOrigin },
      moduleName,
      platform,
    );
  }
  return uniwindResolver(context, moduleName, platform);
};
```

## Approaches that do NOT work

| Approach | Why it fails |
|---|---|
| `nodeModulesPaths` alone | Metro still does hierarchical lookup from the originating file's directory, finding pnpm's per-package symlinks first. |
| `disableHierarchicalLookup = true` | Too aggressive — modules inside `.pnpm` (e.g. `expo`) can no longer find their own peer dependencies like `expo-modules-core`. |
| Removing the custom resolver entirely | Uniwind has no built-in pnpm monorepo support as of v1.5.0. |
