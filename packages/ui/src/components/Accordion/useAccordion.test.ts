import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAccordion } from "./useAccordion";

describe("useAccordion", () => {
  describe("single type", () => {
    it("starts with no expanded items by default", () => {
      const { result } = renderHook(() => useAccordion({ type: "single" }));
      expect(result.current.expandedItems).toEqual([]);
    });

    it("expands an item on toggle", () => {
      const { result } = renderHook(() => useAccordion({ type: "single" }));
      act(() => result.current.toggle("item-1"));
      expect(result.current.expandedItems).toEqual(["item-1"]);
    });

    it("replaces the expanded item when toggling a different one", () => {
      const { result } = renderHook(() => useAccordion({ type: "single" }));
      act(() => result.current.toggle("item-1"));
      act(() => result.current.toggle("item-2"));
      expect(result.current.expandedItems).toEqual(["item-2"]);
    });

    it("does NOT collapse when collapsible is false", () => {
      const { result } = renderHook(() =>
        useAccordion({ type: "single", collapsible: false }),
      );
      act(() => result.current.toggle("item-1"));
      act(() => result.current.toggle("item-1"));
      expect(result.current.expandedItems).toEqual(["item-1"]);
    });

    it("collapses when collapsible is true", () => {
      const { result } = renderHook(() =>
        useAccordion({ type: "single", collapsible: true }),
      );
      act(() => result.current.toggle("item-1"));
      act(() => result.current.toggle("item-1"));
      expect(result.current.expandedItems).toEqual([]);
    });

    it("calls onValueChange with string for single type", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useAccordion({ type: "single", onValueChange: onChange }),
      );
      act(() => result.current.toggle("item-1"));
      expect(onChange).toHaveBeenCalledWith("item-1");
    });
  });

  describe("multiple type", () => {
    it("expands multiple items", () => {
      const { result } = renderHook(() => useAccordion({ type: "multiple" }));
      act(() => result.current.toggle("item-1"));
      act(() => result.current.toggle("item-2"));
      expect(result.current.expandedItems).toEqual(["item-1", "item-2"]);
    });

    it("collapses an individual item", () => {
      const { result } = renderHook(() => useAccordion({ type: "multiple" }));
      act(() => result.current.toggle("item-1"));
      act(() => result.current.toggle("item-2"));
      act(() => result.current.toggle("item-1"));
      expect(result.current.expandedItems).toEqual(["item-2"]);
    });

    it("calls onValueChange with array for multiple type", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useAccordion({ type: "multiple", onValueChange: onChange }),
      );
      act(() => result.current.toggle("item-1"));
      expect(onChange).toHaveBeenCalledWith(["item-1"]);
    });
  });

  describe("controlled mode", () => {
    it("uses the controlled value", () => {
      const { result } = renderHook(() =>
        useAccordion({ type: "single", value: "item-2" }),
      );
      expect(result.current.expandedItems).toEqual(["item-2"]);
    });

    it("does not update internal state when controlled", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useAccordion({ type: "single", value: "item-1", onValueChange: onChange }),
      );
      act(() => result.current.toggle("item-2"));
      // Internal state does not update
      expect(result.current.expandedItems).toEqual(["item-1"]);
      expect(onChange).toHaveBeenCalledWith("item-2");
    });
  });

  describe("defaultValue", () => {
    it("initializes with a string defaultValue", () => {
      const { result } = renderHook(() =>
        useAccordion({ type: "single", defaultValue: "item-1" }),
      );
      expect(result.current.expandedItems).toEqual(["item-1"]);
    });

    it("initializes with an array defaultValue", () => {
      const { result } = renderHook(() =>
        useAccordion({ type: "multiple", defaultValue: ["item-1", "item-2"] }),
      );
      expect(result.current.expandedItems).toEqual(["item-1", "item-2"]);
    });
  });
});
