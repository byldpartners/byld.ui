import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDrawer } from "./useDrawer";

describe("useDrawer", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useDrawer());
    expect(result.current.open).toBe(false);
  });

  it("opens via onOpenChange", () => {
    const { result } = renderHook(() => useDrawer());
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(true);
  });

  it("calls external onOpenChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useDrawer({ onOpenChange: onChange }));
    act(() => result.current.onOpenChange(true));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDrawer({ open: false, onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
