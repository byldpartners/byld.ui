import { View, type ViewProps } from "react-native";
import type { CardProps } from "./Card.types";
import { cn } from "../../utils/cn";
import type { GlassProps } from "../../utils/glass.native";
import { GlassWrapper, useGlassActive } from "../../utils/withGlass.native";
import { useTheme, remToNumber } from "../../theme/native";

interface CardNativeProps extends CardProps, GlassProps, ViewProps {}

function CardContent({ children, className, ...props }: Omit<CardNativeProps, "glass" | "glassEffect" | "glassTextColor">) {
  const glassActive = useGlassActive();

  return (
    <View
      className={cn(
        "rounded-xl shadow-sm",
        !glassActive && "border border-border bg-card text-card-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}

function Card({ children, className, glass, glassEffect, glassTextColor: _, ...props }: CardNativeProps) {
  const { tokens, glass: themeGlass } = useTheme();

  return (
    <GlassWrapper enabled={glass ?? themeGlass} effect={glassEffect} style={{ borderRadius: remToNumber(tokens.radius.xl) }}>
      <CardContent className={className} {...props}>
        {children}
      </CardContent>
    </GlassWrapper>
  );
}

Card.displayName = "Card";

export { Card };
export type { CardNativeProps };
