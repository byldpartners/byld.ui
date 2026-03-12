<div align="center">
  <img src="byld-header.png" alt="Byld" width="100%">
</div>

Byld is a software agency, offering premium senior software developers and designers for innovative software products.

# @byldpartners/ui

Cross-platform UI component library for **web** (React + Radix + Tailwind) and **React Native** (Expo + uniwind).

One import, two platforms — the same component API and Tailwind classes work on both web and mobile.

## Installation

```bash
npm install @byldpartners/ui
# or
pnpm add @byldpartners/ui
```

### Peer dependencies

**Web:**

```bash
npm install react react-dom tailwindcss
```

**React Native (Expo):**

```bash
npm install react react-native react-native-svg lucide-react-native uniwind tailwindcss expo-glass-effect
```

| Package | Version | Required | Platform |
|---------|---------|----------|----------|
| `react` | `>=18` | Yes | Both |
| `react-dom` | `>=18` | Yes | Web |
| `react-native` | `>=0.81` | Yes | Native |
| `react-native-svg` | `>=13.0` | Yes | Native |
| `lucide-react-native` | `>=0.300` | Yes | Native |
| `uniwind` | `>=1.0` | Yes | Native |
| `tailwindcss` | `>=4.0` | Yes | Both |
| `expo-glass-effect` | `>=0.1.0` | No | Native |

> **Note:** `tailwindcss` is required as a direct dependency in your project because `global.css` uses `@import "tailwindcss"` which Metro needs to resolve at build time.

## Quick Start

### Web

**1. Install dependencies and generate config files:**

```bash
npm install @byldpartners/ui react react-dom tailwindcss
npx byldpartners-ui init --platform web
```

This generates `app.css` with Tailwind imports, a `@source` directive pointing to the component library, and all theme color tokens.

**2. Import CSS and wrap with `ThemeProvider`:**

```tsx
import './app.css';
import { ThemeProvider, Button } from "@byldpartners/ui";

function App() {
  return (
    <ThemeProvider>
      <Button variant="default" size="lg">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

### React Native (Expo)

**1. Install dependencies and generate config files:**

```bash
npm install @byldpartners/ui react-native-svg lucide-react-native uniwind tailwindcss expo-glass-effect
npx byldpartners-ui init --platform native
```

This generates:
- `global.css` — Tailwind/uniwind imports, `@source` directive, and light/dark theme token variants
- `metro.config.js` — Expo Metro config wrapped with `withUniwindConfig`
- `uniwind-types.d.ts` — Type augmentation that adds `className` to React Native components

**2. Import CSS and wrap with `ThemeProvider` in your `App.tsx`:**

```tsx
import './global.css';
import { ThemeProvider, Button } from "@byldpartners/ui";

export default function App() {
  return (
    <ThemeProvider defaultTheme="default">
      <Button variant="default" onPress={() => console.log("pressed")}>
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

> **Important:** The `ThemeProvider` is required on both platforms — it initializes the theme context and syncs color tokens at runtime. Without it, `useTheme` calls inside components will throw.

Both platforms use the same Tailwind semantic classes (`bg-primary`, `text-foreground`, `rounded-md`, etc.) — web via Tailwind CSS, native via uniwind.

## Components

50 components with full web (shadcn/Radix) and React Native (uniwind) implementations:

| Phase | Components |
|-------|-----------|
| **Foundation** | Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button |
| **Form & Input** | Calendar, Checkbox, Collapsible, Combobox, Command, DatePicker, Form, Input, InputOTP, Label, RadioGroup, Select, Slider, Switch, Textarea, Toggle, ToggleGroup |
| **Layout & Display** | Card, Carousel, Chart, DataTable, HoverCard, Icon, ResizablePanel, Separator, Skeleton, Table, Tabs |
| **Overlay & Feedback** | ContextMenu, Dialog, Drawer, DropdownMenu, Menubar, NavigationMenu, Popover, Sheet, Sidebar, Toast, Tooltip |
| **Misc** | Pagination, Progress, ScrollArea |

Every component follows the same file structure:

```
ComponentName/
├── ComponentName.types.ts      # Shared props interface
├── useComponentName.ts         # Shared state hook (platform-agnostic)
├── ComponentName.web.tsx       # Web implementation (Radix + Tailwind)
├── ComponentName.native.tsx    # React Native implementation (uniwind)
├── index.ts                    # Web barrel
└── index.native.ts             # Native barrel
```

## Theming

### Web — ThemeProvider

Three presets ship out of the box: `default` (light), `dark`, and `aurora`.

```tsx
import { ThemeProvider } from "@byldpartners/ui";

<ThemeProvider defaultTheme="dark">
  <App />
</ThemeProvider>
```

Switch themes at runtime:

```tsx
import { useTheme } from "@byldpartners/ui";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "default" ? "dark" : "default")}>
      Toggle theme
    </button>
  );
}
```

### Native — ThemeProvider + Tailwind dark mode

On native, wrap your app in `ThemeProvider` (same as web). Theming works through Tailwind's built-in dark mode via uniwind. Components use semantic classes like `bg-primary` and `text-foreground` which automatically respond to the `@variant light` / `@variant dark` blocks in your `global.css`.

```tsx
import { ThemeProvider } from "@byldpartners/ui";

export default function App() {
  return (
    <ThemeProvider defaultTheme="default">
      {/* your app */}
    </ThemeProvider>
  );
}
```

### Custom themes

Define a custom preset and pass it to the provider:

```tsx
import { ThemeProvider } from "@byldpartners/ui";
import type { ThemePreset } from "@byldpartners/ui";
import { defaultPreset, darkPreset, auroraPreset } from "@byldpartners/ui/theme";

const brand: ThemePreset = {
  name: "brand",
  tokens: {
    ...defaultPreset.tokens,
    colors: {
      ...defaultPreset.tokens.colors,
      primary: "oklch(0.6 0.2 260)",
      primaryForeground: "oklch(1 0 0)",
    },
  },
};

<ThemeProvider defaultTheme="brand" presets={[defaultPreset, darkPreset, brand]}>
  <App />
</ThemeProvider>
```

On native, customize themes by extending your `global.css` with Tailwind CSS variable overrides.

### Token structure

Tokens are defined in `src/theme/tokens.ts` and cover:

- **Colors** — oklch values for background, foreground, primary, secondary, muted, accent, destructive, border, input, ring
- **Radius** — sm, md, lg, xl, full
- **Spacing** — xs, sm, md, lg, xl, 2xl, 3xl
- **Typography** — fontFamily, fontFamilyMono

## Button

```tsx
import { Button } from "@byldpartners/ui";

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">+</Button>

// Disabled
<Button disabled>Disabled</Button>

// Slot pattern (web only) — render as child element
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

## Drop-in Mode

You can copy the source directly into your project instead of using the npm package, similar to how shadcn works:

```bash
cp -r node_modules/@byldpartners/ui/src ./packages/ui
```

Then add a path alias in your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@byldpartners/ui": ["./packages/ui/index.ts"],
      "@byldpartners/ui/*": ["./packages/ui/*"]
    }
  }
}
```

## How It Works

The package uses **conditional exports** in `package.json` to serve different code per platform:

- **Web** (Vite, webpack, etc.) — resolves pre-built ESM/CJS bundles from `dist/`
- **React Native** (Metro) — resolves raw TypeScript source from `src/`, and Metro auto-picks `.native.tsx` files over `.web.tsx`

Both platforms use Tailwind classes for styling:
- **Web** — standard Tailwind CSS with `class-variance-authority` for variants
- **Native** — uniwind compiles Tailwind classes to React Native styles at build time

This means web consumers get optimized bundles while native consumers get source that Metro compiles alongside your app code.

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm build

# Run the web playground + Storybook
pnpm --filter @byldpartners/web dev
pnpm --filter @byldpartners/web storybook

# Run the native playground
pnpm --filter @byldpartners/native start

# Scaffold a new component
pnpm new-component ComponentName

# Type check both platforms
pnpm --filter @byldpartners/ui check-types
```

## License

MIT

## Support

For support, visit [https://byld.dev](https://byld.dev) or open an issue on GitHub.

---

**Built with ❤️ by [Byld](https://byld.dev)**
