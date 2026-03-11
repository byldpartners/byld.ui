import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import {
  useCalendar,
  getDaysInMonth,
  getFirstDayOfMonth,
  isSameDay,
} from "./useCalendar";

describe("getDaysInMonth", () => {
  it("returns 31 for January", () => {
    expect(getDaysInMonth(2024, 0)).toBe(31);
  });

  it("returns 29 for Feb in a leap year", () => {
    expect(getDaysInMonth(2024, 1)).toBe(29);
  });

  it("returns 28 for Feb in a non-leap year", () => {
    expect(getDaysInMonth(2023, 1)).toBe(28);
  });

  it("returns 30 for April", () => {
    expect(getDaysInMonth(2024, 3)).toBe(30);
  });
});

describe("getFirstDayOfMonth", () => {
  it("returns the correct day of week", () => {
    // Jan 1, 2024 is a Monday (1)
    expect(getFirstDayOfMonth(2024, 0)).toBe(1);
  });
});

describe("isSameDay", () => {
  it("returns true for same dates", () => {
    const a = new Date(2024, 5, 15);
    const b = new Date(2024, 5, 15);
    expect(isSameDay(a, b)).toBe(true);
  });

  it("returns false for different dates", () => {
    const a = new Date(2024, 5, 15);
    const b = new Date(2024, 5, 16);
    expect(isSameDay(a, b)).toBe(false);
  });

  it("ignores time differences", () => {
    const a = new Date(2024, 5, 15, 10, 30);
    const b = new Date(2024, 5, 15, 22, 0);
    expect(isSameDay(a, b)).toBe(true);
  });
});

describe("useCalendar", () => {
  it("initializes with current month when no props", () => {
    const now = new Date();
    const { result } = renderHook(() => useCalendar({}));
    expect(result.current.year).toBe(now.getFullYear());
    expect(result.current.monthIndex).toBe(now.getMonth());
  });

  it("initializes with selected date's month", () => {
    const selected = new Date(2024, 5, 15); // June 2024
    const { result } = renderHook(() => useCalendar({ selected }));
    expect(result.current.year).toBe(2024);
    expect(result.current.monthIndex).toBe(5);
  });

  it("navigates to previous month (uncontrolled)", () => {
    const selected = new Date(2024, 5, 15); // June 2024
    const { result } = renderHook(() => useCalendar({ selected }));

    act(() => result.current.goToPrevMonth());
    expect(result.current.monthIndex).toBe(4); // May
  });

  it("navigates to next month (uncontrolled)", () => {
    const selected = new Date(2024, 5, 15); // June 2024
    const { result } = renderHook(() => useCalendar({ selected }));

    act(() => result.current.goToNextMonth());
    expect(result.current.monthIndex).toBe(6); // July
  });

  it("wraps around year boundary going backward (uncontrolled)", () => {
    const selected = new Date(2024, 0, 15); // January 2024
    const { result } = renderHook(() => useCalendar({ selected }));

    act(() => result.current.goToPrevMonth());
    expect(result.current.monthIndex).toBe(11); // December
    expect(result.current.year).toBe(2023);
  });

  it("calls onMonthChange in controlled mode", () => {
    const onMonthChange = vi.fn();
    const month = new Date(2024, 5, 1);
    const { result } = renderHook(() =>
      useCalendar({ month, onMonthChange }),
    );

    act(() => result.current.goToNextMonth());
    expect(onMonthChange).toHaveBeenCalled();
    // Controlled: monthIndex stays the same
    expect(result.current.monthIndex).toBe(5);
  });

  it("calls onSelect when a day is pressed", () => {
    const onSelect = vi.fn();
    const month = new Date(2024, 5, 1);
    const { result } = renderHook(() => useCalendar({ month, onSelect }));

    act(() => result.current.handleDayPress(15));
    expect(onSelect).toHaveBeenCalledWith(new Date(2024, 5, 15));
  });

  it("does not call onSelect when disabled", () => {
    const onSelect = vi.fn();
    const month = new Date(2024, 5, 1);
    const { result } = renderHook(() =>
      useCalendar({ month, onSelect, disabled: true }),
    );

    act(() => result.current.handleDayPress(15));
    expect(onSelect).not.toHaveBeenCalled();
  });

  it("generates correct cells array", () => {
    const month = new Date(2024, 5, 1); // June 2024 starts on Saturday (6)
    const { result } = renderHook(() => useCalendar({ month }));

    // June 2024: first day is Saturday (6), 30 days
    expect(result.current.cells.filter((c) => c === null)).toHaveLength(
      result.current.firstDay,
    );
    expect(result.current.cells.filter((c) => c !== null)).toHaveLength(30);
  });

  it("provides a human-readable month label", () => {
    const month = new Date(2024, 5, 1);
    const { result } = renderHook(() => useCalendar({ month }));
    expect(result.current.monthLabel).toContain("June");
    expect(result.current.monthLabel).toContain("2024");
  });
});
