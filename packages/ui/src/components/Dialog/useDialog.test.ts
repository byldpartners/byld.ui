import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDialog } from "./useDialog";

describe("useDialog", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useDialog());
    expect(result.current.open).toBe(false);
  });

  it("uses defaultOpen", () => {
    const { result } = renderHook(() => useDialog({ defaultOpen: true }));
    expect(result.current.open).toBe(true);
  });

  it("opens via onOpenChange", () => {
    const { result } = renderHook(() => useDialog());
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(true);
  });

  it("closes via onOpenChange", () => {
    const { result } = renderHook(() => useDialog({ defaultOpen: true }));
    act(() => result.current.onOpenChange(false));
    expect(result.current.open).toBe(false);
  });

  it("calls external onOpenChange callback", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() => useDialog({ onOpenChange: onChange }));
    act(() => result.current.onOpenChange(true));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useDialog({ open: false, onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
