import { useState } from "react";
import { Pressable, type PressableProps } from "react-native";
import type { ToggleVariant, ToggleSize } from "./Toggle.types";
import { cn } from "../../utils/cn";

interface ToggleNativeProps extends Omit<PressableProps, "children"> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  children?: React.ReactNode;
}

const sizeClasses: Record<ToggleSize, string> = {
  default: "h-9 px-2 min-w-[36px]",
  sm: "h-8 px-1.5 min-w-[32px]",
  lg: "h-10 px-2.5 min-w-[40px]",
};

function Toggle({
  pressed: controlledPressed,
  defaultPressed = false,
  onPressedChange,
  variant = "default",
  size = "default",
  disabled = false,
  children,
  className,
  ...props
}: ToggleNativeProps) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed);
  const isPressed = controlledPressed !== undefined ? controlledPressed : internalPressed;

  const handlePress = () => {
    if (disabled) return;
    const next = !isPressed;
    if (controlledPressed === undefined) {
      setInternalPressed(next);
    }
    onPressedChange?.(next);
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-center rounded-md gap-2",
        variant === "outline" && "border border-input",
        isPressed ? "bg-secondary" : "bg-transparent",
        sizeClasses[size],
        disabled && "opacity-50",
        className,
      )}
      accessibilityRole="button"
      accessibilityState={{ selected: isPressed }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

Toggle.displayName = "Toggle";

export { Toggle };
export type { ToggleNativeProps };
