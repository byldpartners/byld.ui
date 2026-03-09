import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  type ViewProps,
} from "react-native";
import type { CalendarProps } from "./Calendar.types";
import { cn } from "../../utils/cn";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

interface CalendarNativeProps extends ViewProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  disabled?: boolean;
}

function Calendar({
  selected,
  onSelect,
  month: controlledMonth,
  onMonthChange,
  disabled = false,
  className,
  ...props
}: CalendarNativeProps) {
  const [internalMonth, setInternalMonth] = useState(
    controlledMonth || selected || new Date(),
  );
  const displayMonth = controlledMonth || internalMonth;

  const year = displayMonth.getFullYear();
  const monthIndex = displayMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const firstDay = getFirstDayOfMonth(year, monthIndex);

  const monthLabel = displayMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const goToPrevMonth = () => {
    const prev = new Date(year, monthIndex - 1, 1);
    if (controlledMonth === undefined) setInternalMonth(prev);
    onMonthChange?.(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(year, monthIndex + 1, 1);
    if (controlledMonth === undefined) setInternalMonth(next);
    onMonthChange?.(next);
  };

  const handleDayPress = (day: number) => {
    if (disabled) return;
    const date = new Date(year, monthIndex, day);
    onSelect?.(date);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return (
    <View className={cn("p-3", className)} {...props}>
      <View className="flex-row items-center justify-between mb-4">
        <Pressable
          onPress={goToPrevMonth}
          disabled={disabled}
          className="w-7 h-7 rounded-md border border-border items-center justify-center"
        >
          <Text className="text-sm text-foreground">&#x2039;</Text>
        </Pressable>
        <Text className="text-sm font-medium text-foreground">
          {monthLabel}
        </Text>
        <Pressable
          onPress={goToNextMonth}
          disabled={disabled}
          className="w-7 h-7 rounded-md border border-border items-center justify-center"
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
