import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";
import { cn } from "../../utils/cn";
import type { SkeletonProps } from "./Skeleton.types";

type SkeletonNativeProps = SkeletonProps & { className?: string };

function Skeleton({
  className,
  ...props
}: SkeletonNativeProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View style={{ opacity }} {...props}>
      <View className={cn("bg-muted rounded-md flex-1 min-h-full min-w-full", className)} />
    </Animated.View>
  );
}
Skeleton.displayName = "Skeleton";

export { Skeleton };
export type { SkeletonNativeProps };
