import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import { cn } from "../../utils/cn";
import type { SkeletonProps } from "./Skeleton.types";

type SkeletonNativeProps = SkeletonProps;

function Skeleton({
  className,
  ...props
}: SkeletonNativeProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();

    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={{ opacity }}
      className={cn("rounded-md bg-primary/10", className)}
      {...props}
    />
  );
}
Skeleton.displayName = "Skeleton";

export { Skeleton };
export type { SkeletonNativeProps };
