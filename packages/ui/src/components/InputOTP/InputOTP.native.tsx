import { useRef } from "react";
import {
  View,
  TextInput,
  type ViewProps,
  type NativeSyntheticEvent,
} from "react-native";
import { cn } from "../../utils/cn";
import { useInputOTP } from "./useInputOTP";
import type { InputOTPProps } from "./InputOTP.types";

interface InputOTPNativeProps extends InputOTPProps, ViewProps {}

function InputOTP({
  length = 6,
  value: controlledValue,
  onValueChange,
  disabled = false,
  className,
  ...props
}: InputOTPNativeProps) {
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const {
    currentValue,
    activeIndex,
    setActiveIndex,
    handleCharInput,
    handleBackspace,
  } = useInputOTP({ length, value: controlledValue, onValueChange });

  const handleChange = (index: number, text: string) => {
    const char = text.slice(-1);
    const nextIndex = handleCharInput(index, char);
    if (nextIndex !== null) {
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleKeyPress = (
    index: number,
    e: NativeSyntheticEvent<{ key: string }>,
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      const focusIndex = handleBackspace(index);
      if (focusIndex !== null) {
        inputRefs.current[focusIndex]?.focus();
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
            "w-9 h-9 rounded-md border border-input items-center justify-center shadow-sm elevation-1",
            activeIndex === i && "border-ring",
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
            className="w-full h-full text-center text-sm leading-tight text-foreground"
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
