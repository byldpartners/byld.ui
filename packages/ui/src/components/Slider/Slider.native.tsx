import { useRef, useCallback } from "react";
import {
  View,
  PanResponder,
  type ViewProps,
  type LayoutChangeEvent,
  type GestureResponderEvent,
} from "react-native";
import { cn } from "../../utils/cn";
import type { SliderProps } from "./Slider.types";
import { useSlider } from "./useSlider";

type SliderNativeProps = SliderProps & Omit<ViewProps, "className">;

function Slider({
  value: controlledValue,
  defaultValue = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
  ...props
}: SliderNativeProps) {
  const { setValue, fraction, getValueFromRatio } = useSlider({
    value: controlledValue,
    defaultValue,
    onValueChange,
    min,
    max,
    step,
  });

  const trackLayout = useRef({ x: 0, width: 0 });

  const updateFromPageX = useCallback((pageX: number) => {
    const { x, width } = trackLayout.current;
    if (width === 0) return;

    const ratio = (pageX - x) / width;
    const newVal = getValueFromRatio(ratio);
    setValue([newVal]);
  }, [getValueFromRatio, setValue]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled,
      onMoveShouldSetPanResponder: () => !disabled,
      onPanResponderGrant: (evt: GestureResponderEvent) => {
        updateFromPageX(evt.nativeEvent.pageX);
      },
      onPanResponderMove: (evt: GestureResponderEvent) => {
        updateFromPageX(evt.nativeEvent.pageX);
      },
    }),
  ).current;

  const handleLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    trackLayout.current.width = width;
    // Measure absolute position on screen
    (e.target as any)?.measure?.(
      (_x: number, _y: number, _w: number, _h: number, pageX: number) => {
        trackLayout.current.x = pageX;
      }
    );
  };

  return (
    <View
      className={cn(
        "w-full h-8 justify-center",
        disabled && "opacity-50",
        className,
      )}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
      {...props}
    >
      <View className="h-1.5 w-full rounded-full bg-primary/20">
        <View
          className="h-full rounded-full bg-primary"
          style={{ width: `${fraction * 100}%` }}
        />
      </View>
      <View
        className="w-4 h-4 rounded-full bg-background border-2 border-primary absolute shadow elevation-1"
        style={{ left: `${fraction * 100}%`, marginLeft: -8 }}
      />
    </View>
  );
}

Slider.displayName = "Slider";

export { Slider };
export type { SliderNativeProps };
