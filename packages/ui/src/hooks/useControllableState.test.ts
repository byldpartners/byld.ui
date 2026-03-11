import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useControllableState } from "./useControllableState";

describe("useControllableState", () => {
  it("uses defaultValue when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: "hello" }),
    );
    expect(result.current[0]).toBe("hello");
  });

  it("updates internal state when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 0 }),
    );

    act(() => result.current[1](5));
    expect(result.current[0]).toBe(5);
  });

  it("accepts a function updater when uncontrolled", () => {
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: 10 }),
    );

    act(() => result.current[1]((prev) => prev + 1));
    expect(result.current[0]).toBe(11);
  });

  it("uses controlled value when provided", () => {
    const { result } = renderHook(() =>
      useControllableState({ value: "controlled", defaultValue: "default" }),
    );
    expect(result.current[0]).toBe("controlled");
  });

  it("does not update internal state when controlled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({
        value: "controlled",
        defaultValue: "default",
        onChange,
      }),
    );

    act(() => result.current[1]("new-value"));
    // Value stays controlled
    expect(result.current[0]).toBe("controlled");
    // But onChange is called
    expect(onChange).toHaveBeenCalledWith("new-value");
  });

  it("calls onChange for both controlled and uncontrolled", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: "start", onChange }),
    );

    act(() => result.current[1]("next"));
    expect(onChange).toHaveBeenCalledWith("next");
    expect(result.current[0]).toBe("next");
  });

  it("reflects updated controlled value on re-render", () => {
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControllableState({ value, defaultValue: "default" }),
      { initialProps: { value: "a" as string | undefined } },
    );

    expect(result.current[0]).toBe("a");
    rerender({ value: "b" });
    expect(result.current[0]).toBe("b");
  });

  it("transitions from uncontrolled to controlled", () => {
    const { result, rerender } = renderHook(
      ({ value }) =>
        useControllableState({ value, defaultValue: "default" }),
      { initialProps: { value: undefined as string | undefined } },
    );

    expect(result.current[0]).toBe("default");
    rerender({ value: "now-controlled" });
    expect(result.current[0]).toBe("now-controlled");
  });
});
