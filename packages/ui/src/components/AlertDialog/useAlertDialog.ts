import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseAlertDialogProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface UseAlertDialogReturn {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function useAlertDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: UseAlertDialogProps = {}): UseAlertDialogReturn {
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

export type { UseAlertDialogProps, UseAlertDialogReturn };
