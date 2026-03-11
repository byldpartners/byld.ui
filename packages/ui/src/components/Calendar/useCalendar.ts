import { useCallback } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseCalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  disabled?: boolean;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function useCalendar({
  selected,
  onSelect,
  month: controlledMonth,
  onMonthChange,
  disabled = false,
}: UseCalendarProps) {
  const [displayMonth, setDisplayMonth] = useControllableState<Date>({
    value: controlledMonth,
    defaultValue: controlledMonth || selected || new Date(),
    onChange: onMonthChange,
  });

  const year = displayMonth.getFullYear();
  const monthIndex = displayMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, monthIndex);
  const firstDay = getFirstDayOfMonth(year, monthIndex);

  const monthLabel = displayMonth.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const goToPrevMonth = useCallback(() => {
    const prev = new Date(year, monthIndex - 1, 1);
    setDisplayMonth(prev);
  }, [year, monthIndex, setDisplayMonth]);

  const goToNextMonth = useCallback(() => {
    const next = new Date(year, monthIndex + 1, 1);
    setDisplayMonth(next);
  }, [year, monthIndex, setDisplayMonth]);

  const handleDayPress = useCallback(
    (day: number) => {
      if (disabled) return;
      const date = new Date(year, monthIndex, day);
      onSelect?.(date);
    },
    [disabled, year, monthIndex, onSelect],
  );

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    cells.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(d);
  }

  return {
    displayMonth,
    year,
    monthIndex,
    daysInMonth,
    firstDay,
    monthLabel,
    cells,
    goToPrevMonth,
    goToNextMonth,
    handleDayPress,
  };
}
