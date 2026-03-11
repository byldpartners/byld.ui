import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCheckbox } from "./useCheckbox";

describe("useCheckbox", () => {
  it("defaults to unchecked", () => {
    const { result } = renderHook(() => useCheckbox({}));
    expect(result.current.checked).toBe(false);
  });

  it("uses defaultChecked", () => {
    const { result } = renderHook(() =>
      useCheckbox({ defaultChecked: true }),
    );
    expect(result.current.checked).toBe(true);
  });

  it("toggles from unchecked to checked", () => {
    const { result } = renderHook(() => useCheckbox({}));
    act(() => result.current.toggle());
    expect(result.current.checked).toBe(true);
  });

  it("toggles from checked to unchecked", () => {
    const { result } = renderHook(() =>
      useCheckbox({ defaultChecked: true }),
    );
    act(() => result.current.toggle());
    expect(result.current.checked).toBe(false);
  });

  it("calls onCheckedChange on toggle", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useCheckbox({ onCheckedChange: onChange }),
    );
    act(() => result.current.toggle());
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("does not toggle when disabled", () => {
    const { result } = renderHook(() =>
      useCheckbox({ disabled: true }),
    );
    act(() => result.current.toggle());
    expect(result.current.checked).toBe(false);
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useCheckbox({ checked: false, onCheckedChange: onChange }),
    );

    act(() => result.current.toggle());
    expect(result.current.checked).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("exposes disabled state", () => {
    const { result } = renderHook(() =>
      useCheckbox({ disabled: true }),
    );
    expect(result.current.disabled).toBe(true);
  });
});
