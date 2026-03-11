import { ScrollView, type ScrollViewProps } from "react-native";
import type { ScrollAreaProps, ScrollBarProps } from "./ScrollArea.types";

interface ScrollAreaNativeProps extends ScrollAreaProps, ScrollViewProps {
  orientation?: "vertical" | "horizontal";
}

function ScrollArea({
  children,
  orientation = "vertical",
  style,
  ...props
}: ScrollAreaNativeProps) {
  return (
    <ScrollView
      horizontal={orientation === "horizontal"}
      showsVerticalScrollIndicator={orientation === "vertical"}
      showsHorizontalScrollIndicator={orientation === "horizontal"}
      className="flex-1"
      style={style}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

ScrollArea.displayName = "ScrollArea";

interface ScrollBarNativeProps extends ScrollBarProps {}

/**
 * ScrollBar is a no-op on native as React Native's ScrollView
 * handles its own scroll indicators natively.
 */
function ScrollBar(_props: ScrollBarNativeProps) {
  return null;
}

ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
export type { ScrollAreaNativeProps, ScrollBarNativeProps };
