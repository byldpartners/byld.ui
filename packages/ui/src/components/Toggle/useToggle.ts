import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
}

interface UseToggleReturn {
  pressed: boolean;
  disabled: boolean;
  toggle: () => void;
}

export function useToggle({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  disabled = false,
}: UseToggleProps): UseToggleReturn {
  const [pressed, setPressed] = useControllableState({
    value: controlledPressed,
    defaultValue: defaultPressed,
    onChange: onPressedChange,
  });

  const toggle = useCallback(() => {
    if (disabled) return;
    setPressed((prev) => !prev);
  }, [disabled, setPressed]);

  return { pressed, disabled, toggle };
}

export type { UseToggleProps, UseToggleReturn };
