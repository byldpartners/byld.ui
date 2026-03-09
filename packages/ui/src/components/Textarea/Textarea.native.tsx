import { TextInput, type TextInputProps } from "react-native";
import { cn } from "../../utils/cn";
import type { TextareaProps } from "./Textarea.types";

type TextareaNativeProps = TextareaProps & Omit<TextInputProps, "className">;

function Textarea({
  disabled = false,
  editable,
  className,
  numberOfLines = 4,
  ...props
}: TextareaNativeProps) {
  return (
    <TextInput
      multiline
      numberOfLines={numberOfLines}
      editable={editable !== undefined ? editable : !disabled}
      className={cn(
        "min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 text-sm text-foreground",
        disabled && "opacity-50",
        className,
      )}
      style={{ textAlignVertical: "top" }}
      {...props}
    />
  );
}

Textarea.displayName = "Textarea";

export { Textarea };
export type { TextareaNativeProps };
