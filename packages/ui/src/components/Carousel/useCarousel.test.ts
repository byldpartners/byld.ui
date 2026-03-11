import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCarouselState } from "./useCarousel";

describe("useCarouselState", () => {
  it("starts at index 0", () => {
    const { result } = renderHook(() => useCarouselState());
    expect(result.current.currentIndex).toBe(0);
  });

  it("defaults to horizontal orientation", () => {
    const { result } = renderHook(() => useCarouselState());
    expect(result.current.orientation).toBe("horizontal");
  });

  it("cannot scroll previous at index 0", () => {
    const { result } = renderHook(() => useCarouselState());
    expect(result.current.canScrollPrevious).toBe(false);
  });

  it("cannot scroll next when totalItems is 0", () => {
    const { result } = renderHook(() => useCarouselState());
    expect(result.current.canScrollNext).toBe(false);
  });

  it("scrolls next", () => {
    const { result } = renderHook(() => useCarouselState());

    act(() => result.current.setTotalItems(5));
    act(() => {
      const pos = result.current.scrollNext();
      expect(pos.index).toBe(1);
    });
    expect(result.current.currentIndex).toBe(1);
  });

  it("scrolls previous", () => {
    const { result } = renderHook(() => useCarouselState());

    act(() => result.current.setTotalItems(5));
    act(() => result.current.scrollNext());
    act(() => result.current.scrollNext());
    act(() => {
      const pos = result.current.scrollPrevious();
      expect(pos.index).toBe(1);
    });
    expect(result.current.currentIndex).toBe(1);
  });

  it("does not scroll past the last item", () => {
    const { result } = renderHook(() => useCarouselState());

    act(() => result.current.setTotalItems(2));
    act(() => result.current.scrollNext());
    act(() => result.current.scrollNext()); // Should stay at index 1
    expect(result.current.currentIndex).toBe(1);
  });

  it("does not scroll before index 0", () => {
    const { result } = renderHook(() => useCarouselState());
    act(() => result.current.scrollPrevious());
    expect(result.current.currentIndex).toBe(0);
  });

  it("computes scroll position for horizontal", () => {
    const { result } = renderHook(() => useCarouselState());

    act(() => {
      result.current.setTotalItems(5);
      result.current.setItemWidth(200);
    });
    act(() => {
      const pos = result.current.scrollNext();
      expect(pos.x).toBe(200);
      expect(pos.y).toBe(0);
    });
  });

  it("computes scroll position for vertical", () => {
    const { result } = renderHook(() =>
      useCarouselState({ orientation: "vertical" }),
    );

    act(() => {
      result.current.setTotalItems(5);
      result.current.setItemWidth(200);
    });
    act(() => {
      const pos = result.current.scrollNext();
      expect(pos.x).toBe(0);
      expect(pos.y).toBe(200);
    });
  });

  it("reports canScrollPrevious and canScrollNext correctly", () => {
    const { result } = renderHook(() => useCarouselState());

    act(() => result.current.setTotalItems(3));

    expect(result.current.canScrollPrevious).toBe(false);
    expect(result.current.canScrollNext).toBe(true);

    act(() => result.current.scrollNext());
    expect(result.current.canScrollPrevious).toBe(true);
    expect(result.current.canScrollNext).toBe(true);

    act(() => result.current.scrollNext());
    expect(result.current.canScrollPrevious).toBe(true);
    expect(result.current.canScrollNext).toBe(false);
  });
});
