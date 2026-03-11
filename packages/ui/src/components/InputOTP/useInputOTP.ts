import { useState, useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseInputOTPProps {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
}

export function useInputOTP({
  length = 6,
  value: controlledValue,
  onValueChange,
}: UseInputOTPProps) {
  const [currentValue, setCurrentValue] = useControllableState<string>({
    value: controlledValue,
    defaultValue: "",
    onChange: onValueChange,
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  const updateValue = useCallback(
    (newValue: string) => {
      const clamped = newValue.slice(0, length);
      setCurrentValue(clamped);
    },
    [length, setCurrentValue],
  );

  const handleCharInput = useCallback(
    (index: number, char: string): number | null => {
      if (!char) return null;

      const chars = currentValue.split("");
      while (chars.length < length) chars.push("");
      chars[index] = char;
      updateValue(chars.join(""));

      return index < length - 1 ? index + 1 : null;
    },
    [currentValue, length, updateValue],
  );

  const handleBackspace = useCallback(
    (index: number): number | null => {
      const chars = currentValue.split("");
      if (chars[index]) {
        chars[index] = "";
        updateValue(chars.join(""));
        return null;
      } else if (index > 0) {
        chars[index - 1] = "";
        updateValue(chars.join(""));
        return index - 1;
      }
      return null;
    },
    [currentValue, updateValue],
  );

  return {
    currentValue,
    activeIndex,
    setActiveIndex,
    handleCharInput,
    handleBackspace,
  };
}
