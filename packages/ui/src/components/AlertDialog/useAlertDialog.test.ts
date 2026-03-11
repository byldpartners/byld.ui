import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAlertDialog } from "./useAlertDialog";

describe("useAlertDialog", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useAlertDialog());
    expect(result.current.open).toBe(false);
  });

  it("uses defaultOpen", () => {
    const { result } = renderHook(() => useAlertDialog({ defaultOpen: true }));
    expect(result.current.open).toBe(true);
  });

  it("opens via onOpenChange", () => {
    const { result } = renderHook(() => useAlertDialog());
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(true);
  });

  it("calls external onOpenChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useAlertDialog({ onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useAlertDialog({ open: false, onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
