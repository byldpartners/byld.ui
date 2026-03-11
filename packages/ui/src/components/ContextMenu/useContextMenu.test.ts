import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useContextMenu } from "./useContextMenu";

describe("useContextMenu", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useContextMenu());
    expect(result.current.open).toBe(false);
  });

  it("uses defaultOpen", () => {
    const { result } = renderHook(() =>
      useContextMenu({ defaultOpen: true }),
    );
    expect(result.current.open).toBe(true);
  });

  it("opens and closes", () => {
    const { result } = renderHook(() => useContextMenu());
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(true);
    act(() => result.current.onOpenChange(false));
    expect(result.current.open).toBe(false);
  });

  it("calls external onOpenChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useContextMenu({ onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useContextMenu({ open: false, onOpenChange: onChange }),
    );
    act(() => result.current.onOpenChange(true));
    expect(result.current.open).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });
});
