import { View, type ViewProps } from "react-native";
import type { SeparatorOrientation } from "./Separator.types";
import { cn } from "../../utils/cn";

interface SeparatorNativeProps extends ViewProps {
  orientation?: SeparatorOrientation;
  decorative?: boolean;
}

function Separator({
  orientation = "horizontal",
  style,
  ...props
}: SeparatorNativeProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <View
      accessibilityRole="none"
      className={cn(
        "bg-border",
        isHorizontal ? "h-px w-full" : "w-px h-full"
      )}
      style={style}
      {...props}
    />
  );
}
Separator.displayName = "Separator";

export { Separator };
export type { SeparatorNativeProps };
