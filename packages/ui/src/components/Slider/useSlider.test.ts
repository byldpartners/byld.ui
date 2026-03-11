import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSlider } from "./useSlider";

describe("useSlider", () => {
  it("defaults to [0]", () => {
    const { result } = renderHook(() => useSlider());
    expect(result.current.value).toEqual([0]);
  });

  it("uses defaultValue", () => {
    const { result } = renderHook(() => useSlider({ defaultValue: [50] }));
    expect(result.current.value).toEqual([50]);
  });

  it("computes fraction correctly", () => {
    const { result } = renderHook(() => useSlider({ defaultValue: [50] }));
    expect(result.current.fraction).toBe(0.5);
  });

  it("computes fraction with custom min/max", () => {
    const { result } = renderHook(() =>
      useSlider({ defaultValue: [25], min: 0, max: 50 }),
    );
    expect(result.current.fraction).toBe(0.5);
  });

  it("clamps and steps values", () => {
    const { result } = renderHook(() =>
      useSlider({ min: 0, max: 100, step: 10 }),
    );
    expect(result.current.clampAndStep(15)).toBe(20);
    expect(result.current.clampAndStep(105)).toBe(100);
    expect(result.current.clampAndStep(-5)).toBe(0);
  });

  it("getValueFromRatio computes correctly", () => {
    const { result } = renderHook(() =>
      useSlider({ min: 0, max: 100, step: 1 }),
    );
    expect(result.current.getValueFromRatio(0)).toBe(0);
    expect(result.current.getValueFromRatio(0.5)).toBe(50);
    expect(result.current.getValueFromRatio(1)).toBe(100);
  });

  it("getValueFromRatio clamps out-of-range ratios", () => {
    const { result } = renderHook(() =>
      useSlider({ min: 0, max: 100, step: 1 }),
    );
    expect(result.current.getValueFromRatio(-0.5)).toBe(0);
    expect(result.current.getValueFromRatio(1.5)).toBe(100);
  });

  it("updates value via setValue", () => {
    const { result } = renderHook(() => useSlider());
    act(() => result.current.setValue([75]));
    expect(result.current.value).toEqual([75]);
  });

  it("calls onValueChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useSlider({ onValueChange: onChange }),
    );
    act(() => result.current.setValue([42]));
    expect(onChange).toHaveBeenCalledWith([42]);
  });
});
