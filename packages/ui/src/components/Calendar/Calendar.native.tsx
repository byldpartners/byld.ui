import {
  View,
  Text,
  Pressable,
  type ViewProps,
} from "react-native";
import type { CalendarProps } from "./Calendar.types";
import { useCalendar, isSameDay, isToday } from "./useCalendar";
import { cn } from "../../utils/cn";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface CalendarNativeProps extends CalendarProps, ViewProps {}

function Calendar({
  selected,
  onSelect,
  month: controlledMonth,
  onMonthChange,
  disabled = false,
  className,
  ...props
}: CalendarNativeProps) {
  const {
    year,
    monthIndex,
    monthLabel,
    cells,
    goToPrevMonth,
    goToNextMonth,
    handleDayPress,
  } = useCalendar({
    selected,
    onSelect,
    month: controlledMonth,
    onMonthChange,
    disabled,
  });

  return (
    <View className={cn("p-3", className)} {...props}>
      <View className="flex-row items-center justify-between mb-4">
        <Pressable
          onPress={goToPrevMonth}
          disabled={disabled}
          className="w-7 h-7 rounded-md border border-border items-center justify-center shadow-sm elevation-1"
        >
          <Text className="text-sm text-foreground">&#x2039;</Text>
        </Pressable>
        <Text className="text-sm font-medium text-foreground">
          {monthLabel}
        </Text>
        <Pressable
          onPress={goToNextMonth}
          disabled={disabled}
          className="w-7 h-7 rounded-md border border-border items-center justify-center shadow-sm elevation-1"
        >
          <Text className="text-sm text-foreground">&#x203A;</Text>
        </Pressable>
      </View>

      <View className="flex-row flex-wrap">
        {DAYS.map((day) => (
          <View key={day} className="w-8 h-8 items-center justify-center">
            <Text className="text-xs font-medium text-muted-foreground">{day}</Text>
          </View>
        ))}

        {cells.map((day, i) => {
          if (day === null) {
            return <View key={`empty-${i}`} className="w-8 h-8" />;
          }
          const date = new Date(year, monthIndex, day);
          const isSelected = selected && isSameDay(date, selected);
          const isTodayDate = isToday(date);

          return (
            <Pressable
              key={day}
              onPress={() => handleDayPress(day)}
              disabled={disabled}
              className={cn(
                "w-8 h-8 items-center justify-center rounded-md",
                isTodayDate && !isSelected && "bg-secondary",
                isSelected && "bg-primary",
                disabled && "opacity-50",
              )}
            >
              <Text
                className={cn(
                  "text-sm",
                  isSelected ? "text-primary-foreground" : "text-foreground",
                )}
              >
                {day}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
export type { CalendarNativeProps };
