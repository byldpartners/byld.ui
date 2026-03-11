import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseSidebarProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useSidebar({
  open: controlledOpen,
  defaultOpen = true,
  onOpenChange,
}: UseSidebarProps = {}) {
  const [open, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  const toggleSidebar = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  return { open, setOpen, toggleSidebar };
}
