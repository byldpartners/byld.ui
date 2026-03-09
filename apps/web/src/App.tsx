import { Button, ThemeProvider, useTheme } from "@byldpartners/ui";

function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-2">
      <Button
        variant={theme === "default" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("default")}
      >
        Light
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "outline"}
        size="sm"
        onClick={() => setTheme("dark")}
      >
        Dark
      </Button>
    </div>
  );
}

function Showcase() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">@byldpartners/ui</h1>
          <ThemeSwitcher />
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Button Variants</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Button Sizes</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">+</Button>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Disabled</h2>
          <Button disabled>Disabled</Button>
        </section>
      </div>
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <Showcase />
    </ThemeProvider>
  );
}
