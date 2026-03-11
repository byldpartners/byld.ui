import { ThemeProvider } from "@byldpartners/ui";

export function withThemeProvider(Story: () => React.JSX.Element) {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  );
}
