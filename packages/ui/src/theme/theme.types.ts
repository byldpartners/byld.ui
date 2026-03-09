export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  ring: string;
}

export interface ThemeRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontFamilyMono: string;
}

export interface ThemeTokens {
  colors: ThemeColors;
  radius: ThemeRadius;
  spacing: ThemeSpacing;
  typography: ThemeTypography;
}

export interface ThemePreset {
  name: string;
  tokens: ThemeTokens;
}
