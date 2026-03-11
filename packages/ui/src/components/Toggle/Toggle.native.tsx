import { Pressable, type PressableProps } from "react-native";
import { cva } from "class-variance-authority";
import type { ToggleVariant, ToggleSize, ToggleProps } from "./Toggle.types";
import { useToggle } from "./useToggle";
import { cn } from "../../utils/cn";

interface ToggleNativeProps extends ToggleProps, Omit<PressableProps, "children" | "disabled"> {}

const toggleVariants = cva(
  "flex-row items-center justify-center rounded-md gap-2",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input shadow-sm elevation-1",
      } satisfies Record<ToggleVariant, string>,
      size: {
        default: "h-9 px-2 min-w-[36px]",
        sm: "h-8 px-1.5 min-w-[32px]",
        lg: "h-10 px-2.5 min-w-[40px]",
      } satisfies Record<ToggleSize, string>,
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Toggle({
  pressed: controlledPressed,
  defaultPressed,
  onPressedChange,
  variant = "default",
  size = "default",
  disabled: disabledProp,
  children,
  className,
  ...props
}: ToggleNativeProps) {
  const { pressed, disabled, toggle } = useToggle({
    pressed: controlledPressed,
    defaultPressed,
    onPressedChange,
    disabled: disabledProp,
  });

  return (
    <Pressable
      onPress={toggle}
      disabled={disabled}
      className={cn(
        toggleVariants({ variant, size }),
        pressed ? "bg-secondary" : "bg-transparent",
        disabled && "opacity-50",
        className,
      )}
      accessibilityRole="button"
      accessibilityState={{ selected: pressed }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

Toggle.displayName = "Toggle";

export { Toggle, toggleVariants };
export type { ToggleNativeProps };
