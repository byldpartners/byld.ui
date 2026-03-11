import { forwardRef, useState } from "react";
import { cn } from "../../utils/cn";
import type { CalendarProps } from "./Calendar.types";

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

const Calendar = forwardRef<HTMLDivElement, CalendarProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect">>(
  (
    {
      selected,
      onSelect,
      month: controlledMonth,
      onMonthChange,
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
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

    const handleDayClick = (day: number) => {
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
      <div ref={ref} className={cn("p-3", className)} {...props}>
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={goToPrevMonth}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="text-sm font-medium">{monthLabel}</div>
          <button
            type="button"
            onClick={goToNextMonth}
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-input bg-transparent text-sm shadow-sm hover:bg-accent hover:text-accent-foreground"
            disabled={disabled}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>
        <div className="grid grid-cols-7 gap-0">
          {DAYS.map((day) => (
            <div
              key={day}
              className="flex h-8 w-8 items-center justify-center text-[0.8rem] text-muted-foreground font-medium"
            >
              {day}
            </div>
          ))}
          {cells.map((day, i) => {
            if (day === null) {
              return <div key={`empty-${i}`} className="h-8 w-8" />;
            }
            const date = new Date(year, monthIndex, day);
            const isSelected = selected && isSameDay(date, selected);
            const isTodayDate = isToday(date);

            return (
              <button
                key={day}
                type="button"
                onClick={() => handleDayClick(day)}
                disabled={disabled}
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                  isSelected &&
                    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                  isTodayDate && !isSelected && "bg-accent text-accent-foreground",
                )}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);
Calendar.displayName = "Calendar";

export { Calendar };
