import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCollapsible } from "./useCollapsible";

describe("useCollapsible", () => {
  it("defaults to closed", () => {
    const { result } = renderHook(() => useCollapsible({}));
    expect(result.current.open).toBe(false);
  });

  it("uses defaultOpen", () => {
    const { result } = renderHook(() => useCollapsible({ defaultOpen: true }));
    expect(result.current.open).toBe(true);
  });

  it("toggles open state", () => {
    const { result } = renderHook(() => useCollapsible({}));
    act(() => result.current.toggle());
    expect(result.current.open).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.open).toBe(false);
  });

  it("sets open state directly", () => {
    const { result } = renderHook(() => useCollapsible({}));
    act(() => result.current.setOpen(true));
    expect(result.current.open).toBe(true);
  });

  it("calls onOpenChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useCollapsible({ onOpenChange: onChange }),
    );
    act(() => result.current.toggle());
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    const { result } = renderHook(() =>
      useCollapsible({ disabled: true }),
    );
    act(() => result.current.toggle());
    expect(result.current.open).toBe(false);
  });

  it("exposes disabled state", () => {
    const { result } = renderHook(() =>
      useCollapsible({ disabled: true }),
    );
    expect(result.current.disabled).toBe(true);
  });
});
