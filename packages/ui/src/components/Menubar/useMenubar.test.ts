import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMenubarMenu } from "./useMenubar";

describe("useMenubarMenu", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useMenubarMenu());
    expect(result.current.open).toBe(false);
  });

  it("opens via onOpenChange", () => {
    const { result } = renderHook(() => useMenubarMenu());
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(true);
  });

  it("calls external onOpenChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useMenubarMenu({ onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useMenubarMenu({ open: false, onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
