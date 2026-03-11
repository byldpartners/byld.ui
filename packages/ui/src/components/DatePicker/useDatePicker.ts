import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseDatePickerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  value?: Date;
  onValueChange?: (date: Date | undefined) => void;
}

export function useDatePicker({
  open: controlledOpen,
  onOpenChange,
  value,
  onValueChange,
}: UseDatePickerProps) {
  const [open, setOpen] = useControllableState<boolean>({
    value: controlledOpen,
    defaultValue: false,
    onChange: onOpenChange,
  });

  const openPicker = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const closePicker = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleSelect = useCallback(
    (date: Date | undefined) => {
      onValueChange?.(date);
      setOpen(false);
    },
    [onValueChange, setOpen],
  );

  const displayText = value
    ? value.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : undefined;

  return {
    open,
    openPicker,
    closePicker,
    handleSelect,
    displayText,
  };
}
