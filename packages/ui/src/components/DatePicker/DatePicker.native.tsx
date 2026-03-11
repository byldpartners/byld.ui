import {
  View,
  Text,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  type PressableProps,
} from "react-native";
import { Calendar as CalendarIcon } from "lucide-react-native";
import type { DatePickerProps } from "./DatePicker.types";
import { Calendar } from "../Calendar/Calendar.native";
import { Icon } from "../Icon/Icon.native";
import { useDatePicker } from "./useDatePicker";
import { cn } from "../../utils/cn";

interface DatePickerNativeProps
  extends DatePickerProps,
    Omit<PressableProps, "children" | "disabled"> {}

function DatePicker({
  value,
  onValueChange,
  placeholder = "Pick a date",
  disabled = false,
  className,
  ...props
}: DatePickerNativeProps) {
  const { open, openPicker, closePicker, handleSelect, displayText } =
    useDatePicker({ value, onValueChange });

  return (
    <>
      <Pressable
        onPress={() => !disabled && openPicker()}
        disabled={disabled}
        className={cn(
          "flex-row items-center h-9 w-full rounded-md border border-input px-3 py-2 shadow-sm elevation-1",
          disabled && "opacity-50",
          className,
        )}
        accessibilityRole="button"
        accessibilityLabel={displayText ?? placeholder}
        {...props}
      >
        <View className="mr-3">
          <Icon icon={CalendarIcon} size={16} className="text-muted-foreground" />
        </View>
        <Text
          className={cn(
            "text-sm leading-4",
            value ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {displayText ?? placeholder}
        </Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={closePicker}
      >
        <TouchableWithoutFeedback onPress={closePicker}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View
              onStartShouldSetResponder={() => true}
              className="bg-popover rounded-lg shadow-md elevation-3 border border-border mx-6"
            >
              <Calendar selected={value} onSelect={handleSelect} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

DatePicker.displayName = "DatePicker";

export { DatePicker };
export type { DatePickerNativeProps };
