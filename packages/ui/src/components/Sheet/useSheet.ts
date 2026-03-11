import { useControllableState } from "../../hooks/useControllableState";

interface UseSheetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function useSheet({ open: controlledOpen, onOpenChange }: UseSheetProps = {}) {
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
