import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useToggleGroup } from "./useToggleGroup";

describe("useToggleGroup", () => {
  describe("single type", () => {
    it("starts with empty value", () => {
      const { result } = renderHook(() => useToggleGroup({}));
      expect(result.current.value).toEqual([]);
    });

    it("selects an item", () => {
      const { result } = renderHook(() => useToggleGroup({}));
      act(() => result.current.onItemPress("a"));
      expect(result.current.value).toEqual(["a"]);
    });

    it("deselects an already-selected item", () => {
      const { result } = renderHook(() =>
        useToggleGroup({ defaultValue: "a" }),
      );
      act(() => result.current.onItemPress("a"));
      expect(result.current.value).toEqual([]);
    });

    it("replaces selection when pressing a different item", () => {
      const { result } = renderHook(() =>
        useToggleGroup({ defaultValue: "a" }),
      );
      act(() => result.current.onItemPress("b"));
      expect(result.current.value).toEqual(["b"]);
    });

    it("calls onValueChange with string for single type", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useToggleGroup({ onValueChange: onChange }),
      );
      act(() => result.current.onItemPress("a"));
      expect(onChange).toHaveBeenCalledWith("a");
    });
  });

  describe("multiple type", () => {
    it("adds items to selection", () => {
      const { result } = renderHook(() =>
        useToggleGroup({ type: "multiple" }),
      );
      act(() => result.current.onItemPress("a"));
      act(() => result.current.onItemPress("b"));
      expect(result.current.value).toEqual(["a", "b"]);
    });

    it("removes an item from selection", () => {
      const { result } = renderHook(() =>
        useToggleGroup({ type: "multiple", defaultValue: ["a", "b"] }),
      );
      act(() => result.current.onItemPress("a"));
      expect(result.current.value).toEqual(["b"]);
    });

    it("calls onValueChange with array for multiple type", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useToggleGroup({ type: "multiple", onValueChange: onChange }),
      );
      act(() => result.current.onItemPress("a"));
      expect(onChange).toHaveBeenCalledWith(["a"]);
    });
  });

  it("does not change value when disabled", () => {
    const { result } = renderHook(() =>
      useToggleGroup({ disabled: true }),
    );
    act(() => result.current.onItemPress("a"));
    expect(result.current.value).toEqual([]);
  });
});
