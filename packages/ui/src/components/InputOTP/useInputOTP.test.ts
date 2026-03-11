import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useInputOTP } from "./useInputOTP";

describe("useInputOTP", () => {
  it("starts with empty value", () => {
    const { result } = renderHook(() => useInputOTP({}));
    expect(result.current.currentValue).toBe("");
  });

  it("handles character input", () => {
    const { result } = renderHook(() => useInputOTP({ length: 4 }));

    act(() => {
      result.current.handleCharInput(0, "1");
    });
    expect(result.current.currentValue).toBe("1");
  });

  it("returns next index after input", () => {
    const { result } = renderHook(() => useInputOTP({ length: 4 }));

    let nextIndex: number | null = null;
    act(() => {
      nextIndex = result.current.handleCharInput(0, "1");
    });
    expect(nextIndex).toBe(1);
  });

  it("returns null when inputting at last index", () => {
    const { result } = renderHook(() => useInputOTP({ length: 4 }));

    let nextIndex: number | null = null;
    act(() => {
      nextIndex = result.current.handleCharInput(3, "4");
    });
    expect(nextIndex).toBeNull();
  });

  it("handles backspace - clears current character", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useInputOTP({ length: 4, onValueChange: onChange }),
    );

    act(() => result.current.handleCharInput(0, "1"));
    act(() => result.current.handleCharInput(1, "2"));
    act(() => result.current.handleBackspace(1));

    expect(result.current.currentValue).toBe("1");
  });

  it("handles backspace - moves to previous index when current is empty", () => {
    const { result } = renderHook(() => useInputOTP({ length: 4 }));

    act(() => result.current.handleCharInput(0, "1"));

    let nextIndex: number | null = null;
    act(() => {
      // index 1 is empty, so backspace should clear index 0 and return 0
      nextIndex = result.current.handleBackspace(1);
    });
    expect(nextIndex).toBe(0);
  });

  it("clamps value to length", () => {
    const { result } = renderHook(() => useInputOTP({ length: 4 }));

    // Build up a full value
    act(() => result.current.handleCharInput(0, "1"));
    act(() => result.current.handleCharInput(1, "2"));
    act(() => result.current.handleCharInput(2, "3"));
    act(() => result.current.handleCharInput(3, "4"));

    expect(result.current.currentValue).toBe("1234");
  });

  it("calls onValueChange", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useInputOTP({ length: 4, onValueChange: onChange }),
    );

    act(() => result.current.handleCharInput(0, "5"));
    expect(onChange).toHaveBeenCalled();
  });

  it("returns null for empty char input", () => {
    const { result } = renderHook(() => useInputOTP({ length: 4 }));

    let nextIndex: number | null = null;
    act(() => {
      nextIndex = result.current.handleCharInput(0, "");
    });
    expect(nextIndex).toBeNull();
  });
});
