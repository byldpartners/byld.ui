import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseCollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
}

interface UseCollapsibleReturn {
  open: boolean;
  disabled: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

export function useCollapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
}: UseCollapsibleProps): UseCollapsibleReturn {
  const [open, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const toggle = useCallback(() => {
    if (disabled) return;
    setOpen((prev) => !prev);
  }, [disabled, setOpen]);

  return { open, disabled, setOpen, toggle };
}

export type { UseCollapsibleProps, UseCollapsibleReturn };
