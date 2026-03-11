import { useState, useCallback, useRef } from "react";

interface UseControllableStateProps<T> {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, (value: T | ((prev: T) => T)) => void] {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const setValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      const nextValue =
        typeof next === "function"
          ? (next as (prev: T) => T)(value)
          : next;

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }
      onChangeRef.current?.(nextValue);
    },
    [isControlled, value],
  );

  return [value, setValue];
}
