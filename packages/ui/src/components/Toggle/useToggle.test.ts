import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  it("defaults to not pressed", () => {
    const { result } = renderHook(() => useToggle({}));
    expect(result.current.pressed).toBe(false);
  });

  it("uses defaultPressed", () => {
    const { result } = renderHook(() => useToggle({ defaultPressed: true }));
    expect(result.current.pressed).toBe(true);
  });

  it("toggles pressed state", () => {
    const { result } = renderHook(() => useToggle({}));
    act(() => result.current.toggle());
    expect(result.current.pressed).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.pressed).toBe(false);
  });

  it("calls onPressedChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useToggle({ onPressedChange: onChange }),
    );
    act(() => result.current.toggle());
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    const { result } = renderHook(() => useToggle({ disabled: true }));
    act(() => result.current.toggle());
    expect(result.current.pressed).toBe(false);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useToggle({ pressed: false, onPressedChange: onChange }),
    );
    act(() => result.current.toggle());
    expect(result.current.pressed).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
