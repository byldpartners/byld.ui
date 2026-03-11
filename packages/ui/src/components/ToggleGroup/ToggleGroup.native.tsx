import { createContext, useContext } from "react";
import { View, Pressable, type ViewProps } from "react-native";
import type { ToggleVariant, ToggleSize } from "../Toggle/Toggle.types";
import { cn } from "../../utils/cn";
import { toggleVariants } from "../Toggle/Toggle.native";
import type { ToggleGroupProps, ToggleGroupItemProps } from "./ToggleGroup.types";
import { useToggleGroup } from "./useToggleGroup";

interface ToggleGroupContextValue {
  type: "single" | "multiple";
  value: string[];
  onItemPress: (value: string) => void;
  variant: ToggleVariant;
  size: ToggleSize;
  disabled: boolean;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({
  type: "single",
  value: [],
  onItemPress: () => {},
  variant: "default",
  size: "default",
  disabled: false,
});

type ToggleGroupNativeProps = ToggleGroupProps & Omit<ViewProps, "className">;

function ToggleGroup({
  type,
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "default",
  size = "default",
  disabled: disabledProp,
  children,
  className,
  ...props
}: ToggleGroupNativeProps) {
  const { type: resolvedType, value, disabled, onItemPress } = useToggleGroup({
    type,
    value: controlledValue,
    defaultValue,
    onValueChange,
    disabled: disabledProp,
  });

  return (
    <ToggleGroupContext.Provider
      value={{ type: resolvedType, value, onItemPress, variant, size, disabled }}
    >
      <View
        className={cn("flex-row items-center gap-1", className)}
        {...props}
      >
        {children}
      </View>
    </ToggleGroupContext.Provider>
  );
}

type ToggleGroupItemNativeProps = ToggleGroupItemProps & Omit<ViewProps, "children" | "className">;

function ToggleGroupItem({
  value,
  variant: itemVariant,
  size: itemSize,
  disabled: itemDisabled,
  children,
  className,
  ...props
}: ToggleGroupItemNativeProps) {
  const ctx = useContext(ToggleGroupContext);
  const isPressed = ctx.value.includes(value);
  const isDisabled = ctx.disabled || itemDisabled || false;
  const activeVariant = itemVariant || ctx.variant;
  const activeSize = itemSize || ctx.size;

  return (
    <Pressable
      onPress={() => !isDisabled && ctx.onItemPress(value)}
      disabled={isDisabled}
      className={cn(
        toggleVariants({ variant: activeVariant, size: activeSize }),
        isPressed ? "bg-secondary" : "bg-transparent",
        isDisabled && "opacity-50",
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

ToggleGroup.displayName = "ToggleGroup";
ToggleGroupItem.displayName = "ToggleGroupItem";

export { ToggleGroup, ToggleGroupItem };
export type { ToggleGroupNativeProps, ToggleGroupItemNativeProps };
