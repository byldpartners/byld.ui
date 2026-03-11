import { createContext, useContext, Fragment, type ReactNode } from "react";
import { type StyleProp, type ViewStyle } from "react-native";
import { isGlassSupported } from "./glass.native";

type GlassEffect = "regular" | "clear";

const GlassActiveContext = createContext(false);

/**
 * Returns whether the component is inside an active glass surface.
 */
function useGlassActive(): boolean {
  return useContext(GlassActiveContext);
}

interface GlassWrapperProps {
  enabled: boolean;
  effect?: GlassEffect;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

let GlassView: React.ComponentType<{
  glassEffectStyle?: GlassEffect;
  pointerEvents?: "box-none" | "none" | "box-only" | "auto";
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}> | null = null;

if (isGlassSupported) {
  try {
    const mod = require("expo-glass-effect");
    GlassView = mod.GlassView ?? null;
  } catch {
    // expo-glass-effect not installed — glass effects disabled
  }
}

const GLASS_OVERFLOW_STYLE: ViewStyle = { overflow: "hidden" };

function GlassWrapper({ enabled, effect = "regular", style, children }: GlassWrapperProps) {
  if (enabled && GlassView) {
    return (
      <GlassActiveContext.Provider value={true}>
        <GlassView
          glassEffectStyle={effect}
          pointerEvents="box-none"
          style={[GLASS_OVERFLOW_STYLE, style]}
        >
          {children}
        </GlassView>
      </GlassActiveContext.Provider>
    );
  }
  return <Fragment>{children}</Fragment>;
}

export { GlassWrapper, useGlassActive };
export type { GlassWrapperProps };
