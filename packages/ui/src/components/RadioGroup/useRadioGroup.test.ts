import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useRadioGroup } from "./useRadioGroup";

describe("useRadioGroup", () => {
  it("defaults to empty string", () => {
    const { result } = renderHook(() => useRadioGroup({}));
    expect(result.current.value).toBe("");
  });

  it("uses defaultValue", () => {
    const { result } = renderHook(() =>
      useRadioGroup({ defaultValue: "opt-1" }),
    );
    expect(result.current.value).toBe("opt-1");
  });

  it("selects a value", () => {
    const { result } = renderHook(() => useRadioGroup({}));
    act(() => result.current.selectValue("opt-2"));
    expect(result.current.value).toBe("opt-2");
  });

  it("calls onValueChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useRadioGroup({ onValueChange: onChange }),
    );
    act(() => result.current.selectValue("opt-1"));
    expect(onChange).toHaveBeenCalledWith("opt-1");
  });

  it("does not select when disabled", () => {
    const { result } = renderHook(() =>
      useRadioGroup({ disabled: true }),
    );
    act(() => result.current.selectValue("opt-1"));
    expect(result.current.value).toBe("");
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useRadioGroup({ value: "opt-1", onValueChange: onChange }),
    );
    act(() => result.current.selectValue("opt-2"));
    expect(result.current.value).toBe("opt-1");
    expect(onChange).toHaveBeenCalledWith("opt-2");
  });
});
