import { useState, createContext, useContext } from "react";
import {
  View,
  Pressable,
  type ViewProps,
  type PressableProps,
} from "react-native";
import type { RadioGroupProps, RadioGroupItemProps } from "./RadioGroup.types";
import { cn } from "../../utils/cn";

interface RadioGroupContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: undefined,
  onValueChange: () => {},
  disabled: false,
});

interface RadioGroupNativeProps extends RadioGroupProps, ViewProps {}

function RadioGroup({
  value: controlledValue,
  defaultValue = "",
  onValueChange,
  disabled = false,
  children,
  style,
  ...props
}: RadioGroupNativeProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (val: string) => {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onValueChange?.(val);
  };

  return (
    <RadioGroupContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange, disabled }}
    >
      <View className="gap-2" style={style} {...props}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
}

interface RadioGroupItemNativeProps extends Omit<RadioGroupItemProps, "disabled">, Omit<PressableProps, "children"> {}

function RadioGroupItem({
  value,
  disabled: itemDisabled = false,
  style,
  children,
  ...props
}: RadioGroupItemNativeProps) {
  const ctx = useContext(RadioGroupContext);
  const isSelected = ctx.value === value;
  const isDisabled = ctx.disabled || itemDisabled;

  const handlePress = () => {
    if (!isDisabled) {
      ctx.onValueChange(value);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={isDisabled}
      className={cn(
        "w-5 h-5 rounded-full border border-primary items-center justify-center",
        isDisabled && "opacity-50"
      )}
      style={style}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled: isDisabled || false }}
      {...props}
    >
      {isSelected && (
        <View className="w-2.5 h-2.5 rounded-full bg-primary" />
      )}
    </Pressable>
  );
}

RadioGroup.displayName = "RadioGroup";
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
export type { RadioGroupNativeProps, RadioGroupItemNativeProps };
