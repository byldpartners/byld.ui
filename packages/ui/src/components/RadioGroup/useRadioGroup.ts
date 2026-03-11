import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseRadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

interface UseRadioGroupReturn {
  value: string;
  disabled: boolean;
  selectValue: (value: string) => void;
}

export function useRadioGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled = false,
}: UseRadioGroupProps): UseRadioGroupReturn {
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange,
  });

  const selectValue = useCallback(
    (val: string) => {
      if (disabled) return;
      setValue(val);
    },
    [disabled, setValue],
  );

  return { value, disabled, selectValue };
}

export type { UseRadioGroupProps, UseRadioGroupReturn };
