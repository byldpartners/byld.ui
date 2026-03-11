import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSelect } from "./useSelect";

describe("useSelect", () => {
  it("defaults to empty string", () => {
    const { result } = renderHook(() => useSelect({}));
    expect(result.current.value).toBe("");
  });

  it("uses defaultValue", () => {
    const { result } = renderHook(() => useSelect({ defaultValue: "opt-1" }));
    expect(result.current.value).toBe("opt-1");
  });

  it("updates value via onValueChange", () => {
    const { result } = renderHook(() => useSelect({}));
    act(() => result.current.onValueChange("opt-2"));
    expect(result.current.value).toBe("opt-2");
  });

  it("closes dropdown after selecting a value", () => {
    const { result } = renderHook(() => useSelect({}));
    act(() => result.current.setOpen(true));
    expect(result.current.open).toBe(true);
    act(() => result.current.onValueChange("opt-1"));
    expect(result.current.open).toBe(false);
  });

  it("calls external onValueChange callback", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useSelect({ onValueChange: onChange }),
    );
    act(() => result.current.onValueChange("opt-1"));
    expect(onChange).toHaveBeenCalledWith("opt-1");
  });
});
