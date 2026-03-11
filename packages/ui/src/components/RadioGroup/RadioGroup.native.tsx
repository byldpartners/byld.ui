import { createContext, useContext } from "react";
import {
  View,
  Pressable,
  type ViewProps,
  type PressableProps,
} from "react-native";
import type { RadioGroupProps, RadioGroupItemProps } from "./RadioGroup.types";
import { useRadioGroup } from "./useRadioGroup";
import { cn } from "../../utils/cn";

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({
  value: "",
  onValueChange: () => {},
  disabled: false,
});

interface RadioGroupNativeProps extends RadioGroupProps, ViewProps {}

function RadioGroup({
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled: disabledProp,
  children,
  style,
  ...props
}: RadioGroupNativeProps) {
  const { value, disabled, selectValue } = useRadioGroup({
    value: controlledValue,
    defaultValue,
    onValueChange,
    disabled: disabledProp,
  });

  return (
    <RadioGroupContext.Provider
      value={{ value, onValueChange: selectValue, disabled }}
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
        "w-4 h-4 rounded-full border border-primary items-center justify-center shadow-sm elevation-1",
        isDisabled && "opacity-50"
      )}
      style={style}
      accessibilityRole="radio"
      accessibilityState={{ selected: isSelected, disabled: isDisabled || false }}
      {...props}
    >
      {isSelected && (
        <View className="w-2 h-2 rounded-full bg-primary" />
      )}
    </Pressable>
  );
}

RadioGroup.displayName = "RadioGroup";
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };
export type { RadioGroupNativeProps, RadioGroupItemNativeProps };
