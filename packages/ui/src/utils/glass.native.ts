import { Platform } from "react-native";

export const GLASS_TEXT_DEFAULT = "text-foreground";

export interface GlassProps {
  glass?: boolean;
  glassEffect?: "regular" | "clear";
  /** Tailwind text color class applied to text when glass is active. */
  glassTextColor?: string;
}

let _isGlassSupported = false;
if (Platform.OS === "ios" && parseInt(String(Platform.Version), 10) >= 26) {
  try {
    const { isGlassEffectAPIAvailable } = require("expo-glass-effect");
    _isGlassSupported = isGlassEffectAPIAvailable();
  } catch {
    _isGlassSupported = false;
  }
}

export const isGlassSupported = _isGlassSupported;
