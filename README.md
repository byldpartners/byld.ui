# @byldpartners/ui

Cross-platform UI component library for web and React Native, built on [shadcn/ui](https://ui.shadcn.com/) patterns.

## Structure

```
byld.ui/
├── packages/ui/          # @byldpartners/ui — the component library
├── apps/web/             # Vite + Storybook — web component showcase
├── apps/native/          # Expo — native component showcase
├── scripts/              # Scaffolding scripts
├── turbo.json            # Turborepo task config
└── pnpm-workspace.yaml   # pnpm workspace definition
```

## Setup

```sh
pnpm install
```

### Development

```sh
# Run all dev servers (web Storybook + native Expo)
pnpm dev

# Run individually
pnpm --filter web dev         # Storybook at localhost:6006
pnpm --filter native start    # Expo dev server
```

### Build & Test

```sh
pnpm build         # Build all packages
pnpm check-types   # TypeScript checks (web + native)
pnpm lint          # ESLint
pnpm test          # Vitest
```

## Architecture

### Dual-platform components

Each component has two implementations:

- **`.web.tsx`** — Radix UI primitives + CVA (class-variance-authority) + Tailwind CSS
- **`.native.tsx`** — React Native primitives + [uniwind](https://github.com/nicepkg/uniwind) for Tailwind `className` support

Barrel exports resolve per platform:
- `index.ts` → imports from `.web` (used by web bundlers / tsup)
- `index.native.ts` → imports from `.native` (used by Metro)

### Theming

Theme colors are defined once in `packages/ui/src/theme/presets/` and shared across both platforms. A generation script outputs the CSS files for web and native:

```sh
pnpm generate-theme
```

This reads from `default.ts` and `dark.ts` presets (in `packages/ui/src/theme/presets/`) and generates:
- `apps/web/src/app.css` — Tailwind `@theme` block with default colors + radius
- `apps/native/global.css` — Uniwind `@variant light/dark` blocks with per-theme colors

The theme system uses semantic color tokens (OKLCH) with presets:

**Web:** `ThemeProvider` injects CSS variables onto `document.documentElement` at runtime.

```tsx
import { ThemeProvider, useTheme } from "@byldpartners/ui/theme";

<ThemeProvider defaultTheme="default">
  <App />
</ThemeProvider>
```

**Native:** `ThemeProvider` calls `Uniwind.setTheme()` to switch between light/dark. CSS variables are defined in `global.css` `@variant` blocks (generated from presets).

```tsx
import { ThemeProvider, useTheme } from "@byldpartners/ui";

<ThemeProvider defaultTheme="default">
  <App />
</ThemeProvider>
```

Both expose the same `useTheme()` hook returning `{ theme, setTheme, tokens }`.

**Presets:** `defaultPreset` (light), `darkPreset`, and `auroraPreset` are built in. Custom presets follow the `ThemePreset` interface:

```ts
const brand: ThemePreset = {
  name: "brand",
  tokens: {
    ...defaultPreset.tokens,
    colors: { ...defaultPreset.tokens.colors, primary: "oklch(0.6 0.2 260)" },
  },
};
```

### Package exports

```jsonc
{
  ".": {
    "react-native": "./src/index.native.ts",  // Raw source for Metro
    "import": "./dist/index.js",               // Built ESM for web
    "require": "./dist/index.cjs"              // Built CJS for web
  },
  "./theme": {
    "react-native": "./src/theme/native.ts",
    "import": "./dist/theme/web.js"
  },
  "./src/*": "./src/*"
}
```

## Adding components

```sh
pnpm new-component ComponentName
```

This scaffolds:
- `packages/ui/src/components/ComponentName/ComponentName.web.tsx`
- `packages/ui/src/components/ComponentName/ComponentName.native.tsx`
- `packages/ui/src/components/ComponentName/ComponentName.types.ts`
- `packages/ui/src/components/ComponentName/index.ts`
- `packages/ui/src/components/ComponentName/index.native.ts`

## Native app — Metro config

The native app requires a custom Metro resolver to work with pnpm's symlinked monorepo + uniwind. The key issue: uniwind's native resolver caches a single internal path to prevent infinite recursion when intercepting `react-native` imports, but pnpm creates separate symlinked copies for each workspace package. Imports from `packages/ui` resolve a different copy of uniwind, bypassing the recursion guard.

The fix in `apps/native/metro.config.js` rewrites `originModulePath` for imports from `packages/ui` so they resolve through the app's `node_modules`:

```js
finalConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (context.originModulePath.startsWith(uiPackageRoot)) {
    if (["react-native", "uniwind", "react"].some(
      (m) => moduleName === m || moduleName.startsWith(m + "/")
    )) {
      return uniwindResolver(
        { ...context, originModulePath: path.resolve(projectRoot, "_virtual.js") },
        moduleName, platform
      );
    }
  }
  return uniwindResolver(context, moduleName, platform);
};
```

### Native theming CSS

Theme colors are generated per-variant in `apps/native/global.css` using uniwind's `@variant` syntax (run `pnpm generate-theme` after editing presets):

```css
@variant light {
  --color-background: oklch(1 0 0);
  --color-primary: oklch(0.205 0 0);
  /* ... */
}

@variant dark {
  --color-background: oklch(0.145 0 0);
  --color-primary: oklch(0.985 0 0);
  /* ... */
}
```

Both variants must define the same set of variables.

## Liquid Glass (iOS 26+)

Native components support Apple's Liquid Glass material as an opt-in effect. It uses `expo-glass-effect` under the hood and is a no-op on iOS < 26 and Android.

### Setup

Install `expo-glass-effect` in your Expo app (it's an optional peer dependency of `@byldpartners/ui`):

```sh
npx expo install expo-glass-effect
```

### Per-component usage

Pass the `glass` prop to any supported component:

```tsx
import { Button, Card } from "@byldpartners/ui";

<Button glass>Glass Button</Button>
<Button glass glassEffect="clear">Clear Glass</Button>

<Card glass>
  <Text>Translucent card</Text>
</Card>
```

### Global usage via ThemeProvider

Enable glass for all supported components at once:

```tsx
<ThemeProvider glass defaultTheme="default">
  <App />
</ThemeProvider>
```

Individual components can opt out with `glass={false}`.

### Custom components

Use the exported `GlassWrapper`, `useGlass`, and `isGlassSupported` to add glass support to your own components:

```tsx
import { GlassWrapper, useGlass } from "@byldpartners/ui";
import type { GlassProps } from "@byldpartners/ui";

function MyCard({ glass, glassEffect, children }: GlassProps & { children: React.ReactNode }) {
  const themeGlass = useGlass();
  const enabled = glass ?? themeGlass;

  return (
    <GlassWrapper enabled={enabled} effect={glassEffect}>
      <View className={cn("rounded-xl shadow-sm", !enabled && "bg-card border border-border")}>
        {children}
      </View>
    </GlassWrapper>
  );
}
```

### Supported components

Button, Card (more coming in future updates).

### Notes

- `glassEffect` accepts `"regular"` (default) or `"clear"`
- When glass is active, opaque background classes (e.g. `bg-primary`, `bg-card`) are automatically excluded so the translucent material shows through
- Without `expo-glass-effect` installed, the `glass` prop is silently ignored — no crash
- On Android or iOS < 26, components render normally with their standard backgrounds

## CI/CD

- **GitHub Actions:** `ci.yml` runs on PRs (build, lint, type-check, test).
- **Releases:** Done manually — bump the version in `package.json` and run `npm publish`.
- **Dependabot:** Weekly grouped dependency updates.

## Components

49 components with web and native implementations:

Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Combobox, Command, ContextMenu, DataTable, DatePicker, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, ResizablePanel, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast, Toggle, ToggleGroup, Tooltip
