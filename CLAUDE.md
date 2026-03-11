# CLAUDE.md — byld.ui

## Quick Reference

```sh
pnpm install              # Install dependencies
pnpm build                # Build all packages (turborepo)
pnpm dev                  # Run all dev servers
pnpm check-types          # Type-check web + native
pnpm lint                 # ESLint across all workspaces
pnpm test                 # Run vitest test suites
pnpm new-component Name   # Scaffold a new component (PascalCase)
pnpm generate-theme       # Regenerate CSS from theme presets
```

### Verification Checklist

After making changes, run these to verify correctness:

```sh
pnpm check-types   # Must pass — catches web AND native type errors
pnpm test           # Must pass — vitest for packages/ui
pnpm build          # Must pass — tsup bundles for web
```

## Repo Structure

```
byld.ui/
├── packages/ui/           # @byldpartners/ui — cross-platform component library
├── apps/web/              # Vite + Storybook (web showcase)
├── apps/native/           # Expo (React Native showcase)
├── scripts/               # Scaffolding & code generation
│   ├── new-component.ts
│   └── generate-theme-css.ts
└── turbo.json             # Turborepo task config
```

## Component Architecture

### Dual-Platform Pattern

Every component lives in `packages/ui/src/components/ComponentName/` with this structure:

```
ComponentName/
├── ComponentName.types.ts       # Shared types (used by both platforms)
├── useComponentName.ts          # Shared state hook (platform-agnostic)
├── ComponentName.web.tsx        # Web: Radix + Tailwind + CVA
├── ComponentName.native.tsx     # Native: React Native + uniwind + CVA
├── ComponentName.web.test.tsx   # Tests (vitest + @testing-library/react)
├── ComponentName.stories.tsx    # Storybook stories
├── index.ts                     # Web barrel: exports from .web
└── index.native.ts              # Native barrel: exports from .native
```

- **Web components** use Radix UI primitives, CVA for variants, Tailwind classes, and `cn()` (clsx + twMerge).
- **Native components** use React Native primitives, CVA for variants, Tailwind classes via uniwind, and `cn()` (clsx only).
- **Types are shared** — define props in `.types.ts`, import from both platforms.
- **Barrel files use explicit imports** — `index.ts` imports from `./Component.web` (esbuild needs explicit extensions). `index.native.ts` imports from `./Component.native` (Metro resolves `.native` suffix).

### Shared State Pattern

Components should extract state logic into a shared hook (`useComponentName.ts`) that is platform-agnostic and consumed by both web and native implementations. This is the most important pattern in the repo — it maximizes code reuse and ensures consistent behavior across platforms.

**Foundation**: `useControllableState` (`packages/ui/src/hooks/useControllableState.ts`) — enables every component to work in both controlled and uncontrolled modes. All component-specific hooks build on top of it.

**How to implement shared state for a component:**

1. Create `useComponentName.ts` in the component directory (no `.web`/`.native` suffix — it's shared).
2. Accept controlled props (`value`, `open`, `pressed`, etc.), default props (`defaultValue`, `defaultOpen`), and change callbacks (`onValueChange`, `onOpenChange`).
3. Use `useControllableState` internally to manage state.
4. Return a state object that both `.web.tsx` and `.native.tsx` consume.

**Example** (`useCollapsible.ts`):
```ts
import { useControllableState } from "../../hooks/useControllableState";

export function useCollapsible({
  open, defaultOpen = false, onOpenChange, disabled = false,
}: { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; disabled?: boolean }) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open, defaultValue: defaultOpen, onChange: onOpenChange,
  });
  const toggle = () => { if (!disabled) setIsOpen((prev) => !prev); };
  return { open: isOpen, onOpenChange: setIsOpen, toggle, disabled };
}
```

**Context for compound components**: When a component has child sub-components (e.g., `Tabs` → `TabsTrigger` + `TabsContent`), create a React context in the shared hook file and provide state from the root. Children consume the context — no prop drilling.

**Every stateful component must have a shared hook.** Over 20 components already follow this pattern (Dialog, Drawer, Tabs, RadioGroup, Select, Toggle, Collapsible, Slider, etc.). When adding a new stateful component, always create the shared hook first.

### Creating a New Component

```sh
pnpm new-component MyComponent
```

This scaffolds the full file structure and updates the barrel exports in `packages/ui/src/components/index.ts` and `index.native.ts`. Then implement:

1. Define shared types in `MyComponent.types.ts`
2. **Create shared state hook in `useMyComponent.ts`** — use `useControllableState` for controlled/uncontrolled support
3. Implement web version in `MyComponent.web.tsx` — consume the shared hook
4. Implement native version in `MyComponent.native.tsx` — consume the same shared hook
5. Add tests in `MyComponent.web.test.tsx`
6. Add stories in `MyComponent.stories.tsx`

### Styling Conventions

- Use CVA (`class-variance-authority`) for variant definitions on both platforms.
- Use `cn()` to merge class names — imported from `../../utils/cn` (resolves to `.native` on Metro automatically).
- Tailwind classes are the same across platforms thanks to uniwind.
- On native, text and container styles often need separate CVA variant maps (e.g., `buttonContainerVariants` and `buttonTextVariants`).

## Theming

### Token System

Theme tokens are defined as presets in `packages/ui/src/theme/presets/` using OKLCH color values. Three built-in presets: `default` (light), `dark`, `aurora`.

- **Web** (`theme/web.ts`): Injects CSS custom properties onto `document.documentElement`. Uses `ThemeProvider` and `useTheme()` hook.
- **Native** (`theme/native.ts`): Calls `Uniwind.setTheme()` / `Uniwind.updateCSSVariables()`. Same `ThemeProvider`/`useTheme()` API.

### Updating Themes

1. Edit preset files in `packages/ui/src/theme/presets/`
2. Run `pnpm generate-theme` to regenerate `apps/web/src/app.css` and `apps/native/global.css`

## Testing

- **Framework**: Vitest with jsdom environment
- **Library**: @testing-library/react
- **Convention**: Web tests only — named `Component.web.test.tsx`, co-located with component
- **Run**: `pnpm test` or `pnpm --filter ui test`

## Build System

- **Turborepo** orchestrates tasks across workspaces with dependency-aware caching.
- **tsup** bundles `packages/ui` for web (ESM + CJS + `.d.ts`). Native is consumed as raw source via Metro.
- **Metro** resolves `.native.tsx` files automatically. A custom resolver in `apps/native/metro.config.js` fixes pnpm symlink issues with uniwind — do NOT remove it.
- **Conditional exports** in `packages/ui/package.json` route `react-native` imports to source and web imports to built dist.

## Important Constraints

- **`types` must come before `import`/`require`** in package.json `exports` map.
- **Never remove the custom Metro resolver** in `apps/native/metro.config.js` — it fixes a critical pnpm + uniwind recursion bug. See `learnings/METRO_RESOLVER.md`.
- **`packages/ui` has two tsconfigs**: `tsconfig.json` (web) and `tsconfig.native.json` (native). Both must pass `check-types`.
- **Glass effects** (native only): Use `GlassWrapper`, `useGlassActive()`, and `isGlassSupported` for iOS 26+ glassmorphic UI.

## Versioning & Releases

- **Changesets** for version management. Access is `restricted` (private npm).
- CI runs on PRs (`ci.yml`): build → check-types → lint → test.
- Release on push to main (`release.yml`): changesets creates release PRs or publishes to npm.