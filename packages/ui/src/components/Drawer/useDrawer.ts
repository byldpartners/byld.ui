import { useControllableState } from "../../hooks/useControllableState";

interface UseDrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useDrawer({ open: controlledOpen, onOpenChange }: UseDrawerProps = {}) {
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
