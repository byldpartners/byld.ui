import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSidebar } from "./useSidebar";

describe("useSidebar", () => {
  it("defaults to open", () => {
    const { result } = renderHook(() => useSidebar());
    expect(result.current.open).toBe(true);
  });

  it("respects defaultOpen=false", () => {
    const { result } = renderHook(() => useSidebar({ defaultOpen: false }));
    expect(result.current.open).toBe(false);
  });

  it("toggles open state", () => {
    const { result } = renderHook(() => useSidebar());
    expect(result.current.open).toBe(true);

    act(() => result.current.toggleSidebar());
    expect(result.current.open).toBe(false);

    act(() => result.current.toggleSidebar());
    expect(result.current.open).toBe(true);
  });

  it("sets open state directly", () => {
    const { result } = renderHook(() => useSidebar());
    act(() => result.current.setOpen(false));
    expect(result.current.open).toBe(false);
  });

  it("calls onOpenChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useSidebar({ onOpenChange: onChange }),
    );
    act(() => result.current.toggleSidebar());
    expect(onChange).toHaveBeenCalledWith(false);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useSidebar({ open: true, onOpenChange: onChange }),
    );
    act(() => result.current.toggleSidebar());
    expect(result.current.open).toBe(true);
    expect(onChange).toHaveBeenCalledWith(false);
  });
});
