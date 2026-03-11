import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseSliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function useSlider({
  value: controlledValue,
  defaultValue = [0],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
}: UseSliderProps = {}) {
  const [value, setValue] = useControllableState<number[]>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  });

  const clampAndStep = useCallback(
    (val: number) => {
      const stepped = Math.round((val - min) / step) * step + min;
      return Math.min(max, Math.max(min, stepped));
    },
    [min, max, step],
  );

  const getValueFromRatio = useCallback(
    (ratio: number) => {
      const clamped = Math.max(0, Math.min(1, ratio));
      return clampAndStep(min + clamped * (max - min));
    },
    [min, max, clampAndStep],
  );

  const fraction = (value[0] - min) / (max - min);

  return {
    value,
    setValue,
    fraction,
    clampAndStep,
    getValueFromRatio,
    min,
    max,
    step,
  };
}
