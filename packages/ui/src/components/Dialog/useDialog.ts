import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface UseDialogReturn {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function useDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: UseDialogProps = {}): UseDialogReturn {
  const [open, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
    },
    [setOpen],
  );

  return { open, onOpenChange: handleOpenChange };
}

export type { UseDialogProps, UseDialogReturn };
