import { TextInput, type TextInputProps } from "react-native";
import type { InputProps } from "./Input.types";
import { cn } from "../../utils/cn";

interface InputNativeProps extends InputProps, TextInputProps {
  className?: string;
}

function Input({
  disabled = false,
  editable,
  className,
  placeholderTextColor,
  ...props
}: InputNativeProps) {
  return (
    <TextInput
      editable={editable !== undefined ? editable : !disabled}
      placeholderTextColor={placeholderTextColor}
      className={cn(
        "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground",
        disabled && "opacity-50",
        className,
      )}
      style={{ textAlignVertical: "center" }}
      {...props}
    />
  );
}

Input.displayName = "Input";

export { Input };
export type { InputNativeProps };
