import { useEffect, useRef, useState } from "react";
import {
  View,
  Animated,
  type ViewProps,
  type LayoutChangeEvent,
} from "react-native";
import type { ProgressProps } from "./Progress.types";
import { useProgress } from "./useProgress";

interface ProgressNativeProps extends ProgressProps, ViewProps {}

function Progress({
  value = 0,
  max = 100,
  style,
  ...props
}: ProgressNativeProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);

  const { clampedValue, percentage } = useProgress({ value, max });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [percentage, animatedValue]);

  const handleLayout = (event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  };

  return (
    <View
      className="h-2 w-full overflow-hidden rounded-full bg-primary/20"
      style={style}
      onLayout={handleLayout}
      accessibilityRole="progressbar"
      accessibilityValue={{
        min: 0,
        max,
        now: clampedValue,
      }}
      {...props}
    >
      <Animated.View
        className="h-full bg-primary rounded-full"
        style={{
          width: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, trackWidth],
          }),
        }}
      />
    </View>
  );
}

Progress.displayName = "Progress";

export { Progress };
export type { ProgressNativeProps };
