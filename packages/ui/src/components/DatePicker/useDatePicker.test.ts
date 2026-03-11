import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDatePicker } from "./useDatePicker";

describe("useDatePicker", () => {
  it("starts closed", () => {
    const { result } = renderHook(() => useDatePicker({}));
    expect(result.current.open).toBe(false);
  });

  it("opens the picker", () => {
    const { result } = renderHook(() => useDatePicker({}));
    act(() => result.current.openPicker());
    expect(result.current.open).toBe(true);
  });

  it("closes the picker", () => {
    const { result } = renderHook(() => useDatePicker({}));
    act(() => result.current.openPicker());
    act(() => result.current.closePicker());
    expect(result.current.open).toBe(false);
  });

  it("calls onValueChange and closes on select", () => {
    const onValueChange = vi.fn();
    const { result } = renderHook(() =>
      useDatePicker({ onValueChange }),
    );

    act(() => result.current.openPicker());

    const date = new Date(2024, 5, 15);
    act(() => result.current.handleSelect(date));

    expect(onValueChange).toHaveBeenCalledWith(date);
    expect(result.current.open).toBe(false);
  });

  it("formats display text when value is set", () => {
    const date = new Date(2024, 5, 15);
    const { result } = renderHook(() => useDatePicker({ value: date }));
    expect(result.current.displayText).toContain("June");
    expect(result.current.displayText).toContain("15");
    expect(result.current.displayText).toContain("2024");
  });

  it("returns undefined displayText when no value", () => {
    const { result } = renderHook(() => useDatePicker({}));
    expect(result.current.displayText).toBeUndefined();
  });

  it("works in controlled open mode", () => {
    const onOpenChange = vi.fn();
    const { result } = renderHook(() =>
      useDatePicker({ open: false, onOpenChange }),
    );

    act(() => result.current.openPicker());
    expect(result.current.open).toBe(false);
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
