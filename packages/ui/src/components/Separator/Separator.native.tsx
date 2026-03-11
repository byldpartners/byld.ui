import { View, type ViewProps } from "react-native";
import { cva } from "class-variance-authority";
import type { SeparatorOrientation, SeparatorProps } from "./Separator.types";
import { cn } from "../../utils/cn";

interface SeparatorNativeProps extends SeparatorProps, ViewProps {}

const separatorVariants = cva("bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px h-full",
    } satisfies Record<SeparatorOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

function Separator({
  orientation = "horizontal",
  style,
  className,
  ...props
}: SeparatorNativeProps) {
  return (
    <View
      accessibilityRole="none"
      className={cn(separatorVariants({ orientation }), className)}
      style={style}
      {...props}
    />
  );
}
Separator.displayName = "Separator";

export { Separator, separatorVariants };
export type { SeparatorNativeProps };
