import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseDropdownMenuProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface UseDropdownMenuReturn {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function useDropdownMenu({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: UseDropdownMenuProps = {}): UseDropdownMenuReturn {
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

export type { UseDropdownMenuProps, UseDropdownMenuReturn };
