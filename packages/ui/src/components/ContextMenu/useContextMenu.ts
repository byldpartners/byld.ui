import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseContextMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface UseContextMenuReturn {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function useContextMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: UseContextMenuProps = {}): UseContextMenuReturn {
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

export type { UseContextMenuProps, UseContextMenuReturn };
