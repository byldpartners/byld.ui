import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useTabs } from "./useTabs";

describe("useTabs", () => {
  it("defaults to empty string", () => {
    const { result } = renderHook(() => useTabs({}));
    expect(result.current.value).toBe("");
  });

  it("uses defaultValue", () => {
    const { result } = renderHook(() => useTabs({ defaultValue: "tab-1" }));
    expect(result.current.value).toBe("tab-1");
  });

  it("changes value via onValueChange", () => {
    const { result } = renderHook(() => useTabs({ defaultValue: "tab-1" }));
    act(() => result.current.onValueChange("tab-2"));
    expect(result.current.value).toBe("tab-2");
  });

  it("calls external onValueChange callback", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useTabs({ defaultValue: "tab-1", onValueChange: onChange }),
    );
    act(() => result.current.onValueChange("tab-2"));
    expect(onChange).toHaveBeenCalledWith("tab-2");
  });

  it("works in controlled mode", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useTabs({ value: "controlled", onValueChange: onChange }),
    );
    act(() => result.current.onValueChange("new"));
    expect(result.current.value).toBe("controlled");
    expect(onChange).toHaveBeenCalledWith("new");
  });
});
