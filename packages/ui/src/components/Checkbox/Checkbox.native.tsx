import { Pressable, type PressableProps } from "react-native";
import { Check } from "lucide-react-native";
import type { CheckboxProps } from "./Checkbox.types";
import { useCheckbox } from "./useCheckbox";
import { Icon } from "../Icon/Icon.native";
import { cn } from "../../utils/cn";

interface CheckboxNativeProps extends CheckboxProps, Omit<PressableProps, "onPress" | "children" | "disabled"> {}

function Checkbox({
  checked: controlledChecked,
  defaultChecked,
  onCheckedChange,
  disabled: disabledProp,
  ...props
}: CheckboxNativeProps) {
  const { checked, disabled, toggle } = useCheckbox({
    checked: controlledChecked,
    defaultChecked,
    onCheckedChange,
    disabled: disabledProp,
  });

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      className={cn(
        "w-4 h-4 rounded-sm border items-center justify-center shadow-sm elevation-1",
        checked ? "border-primary bg-primary" : "border-primary bg-transparent",
        disabled && "opacity-50",
      )}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      {...props}
    >
      {checked && (
        <Icon icon={Check} size={12} strokeWidth={3} className="text-primary-foreground" />
      )}
    </Pressable>
  );
}

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxNativeProps };
