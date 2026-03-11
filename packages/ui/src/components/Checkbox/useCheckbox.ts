import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseCheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

interface UseCheckboxReturn {
  checked: boolean;
  disabled: boolean;
  toggle: () => void;
}

export function useCheckbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
}: UseCheckboxProps): UseCheckboxReturn {
  const [checked, setChecked] = useControllableState({
    value: controlledChecked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  const toggle = useCallback(() => {
    if (disabled) return;
    setChecked((prev) => !prev);
  }, [disabled, setChecked]);

  return { checked, disabled, toggle };
}

export type { UseCheckboxProps, UseCheckboxReturn };
