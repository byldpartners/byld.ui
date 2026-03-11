import { useState } from "react";
import { View, type ViewProps, type LayoutChangeEvent } from "react-native";
import type { AspectRatioProps } from "./AspectRatio.types";
import { cn } from "../../utils/cn";
import { useAspectRatio } from "./useAspectRatio";

interface AspectRatioNativeProps extends AspectRatioProps, ViewProps {}

function AspectRatio({
  ratio = 1,
  children,
  className,
  ...props
}: AspectRatioNativeProps) {
  const [width, setWidth] = useState(0);
  const { height, isReady } = useAspectRatio({ ratio, width });

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      onLayout={handleLayout}
      className={cn("relative w-full overflow-hidden", className)}
      style={{ height: isReady ? height : undefined }}
      {...props}
    >
      {isReady ? children : null}
    </View>
  );
}

AspectRatio.displayName = "AspectRatio";

export { AspectRatio };
export type { AspectRatioNativeProps };
