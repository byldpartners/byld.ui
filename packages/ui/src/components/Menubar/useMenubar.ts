import { useControllableState } from "../../hooks/useControllableState";

interface UseMenubarMenuProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useMenubarMenu({ open: controlledOpen, onOpenChange }: UseMenubarMenuProps = {}) {
  const [open, setOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: false,
    onChange: onOpenChange,
  });

  return {
    open,
    onOpenChange: setOpen,
  };
}
