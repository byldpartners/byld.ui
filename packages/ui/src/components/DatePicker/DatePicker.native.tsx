import { Text, Pressable, type PressableProps } from "react-native";
import type { DatePickerProps } from "./DatePicker.types";
import { cn } from "../../utils/cn";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

interface DatePickerNativeProps extends DatePickerProps, Omit<PressableProps, "children" | "disabled"> {}

function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  disabled = false,
  ...props
}: DatePickerNativeProps) {
  return (
    <Pressable
      onPress={() => {
        if (!disabled) {
          // On native, tapping the date picker shows the current date as selected
          // In a real app, this would open a native date picker modal
          onValueChange?.(value || new Date());
        }
      }}
      disabled={disabled}
      className={cn(
        "flex-row items-center h-9 w-full rounded-md border border-input px-3 py-2",
        disabled && "opacity-50",
      )}
      accessibilityRole="button"
      accessibilityLabel={value ? formatDate(value) : placeholder}
      {...props}
    >
      <Text className="text-base text-muted-foreground">&#x1F4C5;</Text>
      <Text
        className={cn(
          "text-sm ml-2",
          value ? "text-foreground" : "text-neutral-400",
        )}
      >
        {value ? formatDate(value) : placeholder}
      </Text>
    </Pressable>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
export type { DatePickerNativeProps };
