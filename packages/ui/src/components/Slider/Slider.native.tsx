import { useState, useRef, useCallback } from "react";
import {
  View,
  PanResponder,
  type ViewProps,
  type LayoutChangeEvent,
  type GestureResponderEvent,
} from "react-native";
import { cn } from "../../utils/cn";
import type { SliderProps } from "./Slider.types";

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
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  // Store latest props in refs so PanResponder always has current values
  const propsRef = useRef({ controlledValue, onValueChange, min, max, step });
  propsRef.current = { controlledValue, onValueChange, min, max, step };

  const trackLayout = useRef({ x: 0, width: 0 });

  const clampAndStep = useCallback((val: number) => {
    const { min: mn, max: mx, step: st } = propsRef.current;
    const stepped = Math.round((val - mn) / st) * st + mn;
    return Math.min(mx, Math.max(mn, stepped));
  }, []);

  const updateFromPageX = useCallback((pageX: number) => {
    const { min: mn, max: mx, controlledValue: cv, onValueChange: ovc } = propsRef.current;
    const { x, width } = trackLayout.current;
    if (width === 0) return;

    const ratio = Math.max(0, Math.min(1, (pageX - x) / width));
    const newVal = clampAndStep(mn + ratio * (mx - mn));
    const next = [newVal];

    if (cv === undefined) {
      setInternalValue(next);
    }
    ovc?.(next);
  }, [clampAndStep]);

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

  const fraction = (currentValue[0] - min) / (max - min);

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
        className="w-5 h-5 rounded-full bg-background border-2 border-primary absolute"
        style={{ left: `${fraction * 100}%`, marginLeft: -10 }}
      />
    </View>
  );
}

Slider.displayName = "Slider";

export { Slider };
export type { SliderNativeProps };
