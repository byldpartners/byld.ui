import { useState } from "react";
import { Pressable, Text, type PressableProps } from "react-native";
import type { CheckboxProps } from "./Checkbox.types";
import { cn } from "../../utils/cn";

interface CheckboxNativeProps extends Omit<PressableProps, "onPress"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Checkbox({
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  ...props
}: CheckboxNativeProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handlePress = () => {
    if (disabled) return;
    const next = !isChecked;
    if (controlledChecked === undefined) {
      setInternalChecked(next);
    }
    onCheckedChange?.(next);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        "w-5 h-5 rounded-sm border items-center justify-center",
        isChecked ? "border-primary bg-primary" : "border-neutral-300 bg-transparent",
        disabled && "opacity-50",
      )}
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked, disabled }}
      {...props}
    >
      {isChecked && (
        <Text className="text-primary-foreground text-sm font-bold leading-4">
          ✓
        </Text>
      )}
    </Pressable>
  );
}

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxNativeProps };
