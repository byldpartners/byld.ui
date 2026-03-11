import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UsePopoverProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface UsePopoverReturn {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function usePopover({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: UsePopoverProps = {}): UsePopoverReturn {
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

export type { UsePopoverProps, UsePopoverReturn };
