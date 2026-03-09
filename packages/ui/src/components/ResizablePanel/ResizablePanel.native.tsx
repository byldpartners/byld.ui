import { View, Text, type ViewProps } from "react-native";
import type { ResizableDirection } from "./ResizablePanel.types";
import { cn } from "../../utils/cn";

interface ResizablePanelGroupNativeProps extends ViewProps {
  direction?: ResizableDirection;
  children?: React.ReactNode;
}

/**
 * ResizablePanelGroup on native is a placeholder.
 * Resize interactions are not meaningful on mobile.
 */
function ResizablePanelGroup({
  direction = "horizontal",
  children,
  style,
  ...props
}: ResizablePanelGroupNativeProps) {
  return (
    <View
      className={cn(
        "flex-1",
        direction === "horizontal" ? "flex-row" : "flex-col"
      )}
      style={style}
      {...props}
    >
      {children}
    </View>
  );
}
ResizablePanelGroup.displayName = "ResizablePanelGroup";

interface ResizablePanelNativeProps extends ViewProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children?: React.ReactNode;
}

function ResizablePanel({
  defaultSize,
  children,
  style,
  ...props
}: ResizablePanelNativeProps) {
  return (
    <View
      className="overflow-hidden"
      style={[{ flex: defaultSize ?? 1 }, style]}
      {...props}
    >
      {children}
    </View>
  );
}
ResizablePanel.displayName = "ResizablePanel";

interface ResizableHandleNativeProps extends ViewProps {
  withHandle?: boolean;
}

function ResizableHandle({
  style,
  ...props
}: ResizableHandleNativeProps) {
  return (
    <View
      className="w-px bg-border items-center justify-center"
      style={style}
      {...props}
    >
      <Text className="text-muted-foreground text-[10px]">{"\u22EE"}</Text>
    </View>
  );
}
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
export type {
  ResizablePanelGroupNativeProps,
  ResizablePanelNativeProps,
  ResizableHandleNativeProps,
};
