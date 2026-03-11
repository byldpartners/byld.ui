import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCombobox } from "./useCombobox";

const items = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
];

describe("useCombobox", () => {
  it("returns all items when no search", () => {
    const { result } = renderHook(() =>
      useCombobox({ items, filterFn: (item, search) => item.label.toLowerCase().includes(search.toLowerCase()) }),
    );
    expect(result.current.filteredItems).toEqual(items);
  });

  it("filters items based on search", () => {
    const { result } = renderHook(() =>
      useCombobox({
        items,
        filterFn: (item, search) => item.label.toLowerCase().includes(search.toLowerCase()),
      }),
    );
    act(() => result.current.setSearch("ban"));
    expect(result.current.filteredItems).toEqual([items[1]]);
  });

  it("starts closed", () => {
    const { result } = renderHook(() => useCombobox({ items }));
    expect(result.current.open).toBe(false);
  });

  it("closes dropdown and clears search on value change", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useCombobox({ items, onValueChange: onChange }),
    );

    act(() => result.current.setOpen(true));
    act(() => result.current.setSearch("test"));
    act(() => result.current.onValueChange("apple"));

    expect(result.current.open).toBe(false);
    expect(result.current.search).toBe("");
    expect(onChange).toHaveBeenCalledWith("apple");
  });

  it("toggles value off when selecting same value", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useCombobox({ items, value: "apple", onValueChange: onChange }),
    );

    act(() => result.current.onValueChange("apple"));
    expect(onChange).toHaveBeenCalledWith("");
  });
});
