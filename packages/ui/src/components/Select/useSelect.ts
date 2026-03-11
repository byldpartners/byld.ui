import { useState, useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseSelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function useSelect({ value, defaultValue = "", onValueChange }: UseSelectProps) {
  const [currentValue, setCurrentValue] = useControllableState<string>({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  const [open, setOpen] = useState(false);

  const handleValueChange = useCallback(
    (val: string) => {
      setCurrentValue(val);
      setOpen(false);
    },
    [setCurrentValue],
  );

  return {
    value: currentValue,
    onValueChange: handleValueChange,
    open,
    setOpen,
  };
}
