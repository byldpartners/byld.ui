import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSheet } from "./useSheet";

describe("useSheet", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useSheet());
    expect(result.current.open).toBe(false);
  });

  it("opens via onOpenChange", () => {
    const { result } = renderHook(() => useSheet());
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(true);
  });

  it("closes via onOpenChange", () => {
    const { result } = renderHook(() => useSheet());
    act(() => result.current.onOpenChange(true));
    act(() => result.current.onOpenChange(false));
    expect(result.current.open).toBe(false);
  });

  it("calls external onOpenChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useSheet({ onOpenChange: onChange }));
    act(() => result.current.onOpenChange(true));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useSheet({ open: false, onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
