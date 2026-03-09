import { useState, createContext, useContext } from "react";
import { View, Pressable, type ViewProps } from "react-native";
import type { ToggleVariant, ToggleSize } from "../Toggle/Toggle.types";
import { cn } from "../../utils/cn";
import type { ToggleGroupProps, ToggleGroupItemProps } from "./ToggleGroup.types";

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
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  variant = "default",
  size = "default",
  disabled = false,
  children,
  className,
  ...props
}: ToggleGroupNativeProps) {
  const normalizeValue = (v: string | string[] | undefined): string[] => {
    if (v === undefined) return [];
    return Array.isArray(v) ? v : [v];
  };

  const [internalValue, setInternalValue] = useState<string[]>(
    normalizeValue(defaultValue),
  );
  const currentValue =
    controlledValue !== undefined
      ? normalizeValue(controlledValue)
      : internalValue;

  const onItemPress = (itemValue: string) => {
    let next: string[];
    if (type === "single") {
      next = currentValue.includes(itemValue) ? [] : [itemValue];
    } else {
      next = currentValue.includes(itemValue)
        ? currentValue.filter((v) => v !== itemValue)
        : [...currentValue, itemValue];
    }
    if (controlledValue === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(type === "single" ? (next[0] || "") : next);
  };

  return (
    <ToggleGroupContext.Provider
      value={{ type, value: currentValue, onItemPress, variant, size, disabled }}
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

const sizeClasses: Record<ToggleSize, string> = {
  default: "h-9 px-2 min-w-[36px]",
  sm: "h-8 px-1.5 min-w-[32px]",
  lg: "h-10 px-2.5 min-w-[40px]",
};

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
        "flex-row items-center justify-center rounded-md gap-2",
        activeVariant === "outline" && "border border-input",
        isPressed ? "bg-secondary" : "bg-transparent",
        sizeClasses[activeSize],
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
