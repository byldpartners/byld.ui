import { useState, useRef, useCallback } from "react";
import {
  View,
  TextInput,
  type ViewProps,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from "react-native";
import { cn } from "../../utils/cn";
import type { InputOTPProps } from "./InputOTP.types";

interface InputOTPNativeProps extends ViewProps {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

function InputOTP({
  length = 6,
  value: controlledValue,
  onValueChange,
  disabled = false,
  className,
  ...props
}: InputOTPNativeProps) {
  const [internalValue, setInternalValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const updateValue = useCallback(
    (newValue: string) => {
      const clamped = newValue.slice(0, length);
      if (controlledValue === undefined) {
        setInternalValue(clamped);
      }
      onValueChange?.(clamped);
    },
    [controlledValue, length, onValueChange],
  );

  const handleChange = (index: number, text: string) => {
    const char = text.slice(-1);
    if (!char) return;

    const chars = currentValue.split("");
    while (chars.length < length) chars.push("");
    chars[index] = char;
    updateValue(chars.join(""));

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const chars = currentValue.split("");
      if (chars[index]) {
        chars[index] = "";
        updateValue(chars.join(""));
      } else if (index > 0) {
        chars[index - 1] = "";
        updateValue(chars.join(""));
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <View
      className={cn(
        "flex-row gap-2",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {Array.from({ length }, (_, i) => (
        <View
          key={i}
          className={cn(
            "w-9 h-9 rounded-md border border-input items-center justify-center",
            activeIndex === i && "border-foreground",
          )}
        >
          <TextInput
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            value={currentValue[i] || ""}
            onChangeText={(text) => handleChange(i, text)}
            onKeyPress={(e) => handleKeyPress(i, e)}
            onFocus={() => setActiveIndex(i)}
            onBlur={() => setActiveIndex(-1)}
            maxLength={1}
            keyboardType="number-pad"
            editable={!disabled}
            className="w-full h-full text-center text-sm text-foreground"
            selectTextOnFocus
          />
        </View>
      ))}
    </View>
  );
}

InputOTP.displayName = "InputOTP";

export { InputOTP };
export type { InputOTPNativeProps };
