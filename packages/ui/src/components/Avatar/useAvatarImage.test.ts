import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAvatarImage } from "./useAvatarImage";

describe("useAvatarImage", () => {
  it("starts in error status when no src", () => {
    const { result } = renderHook(() => useAvatarImage());
    expect(result.current.status).toBe("error");
    expect(result.current.showImage).toBe(false);
  });

  it("starts in idle status when src is provided", () => {
    const { result } = renderHook(() => useAvatarImage({ src: "https://example.com/avatar.png" }));
    expect(result.current.status).toBe("idle");
    expect(result.current.showImage).toBe(true);
  });

  it("transitions to loading on loadStart", () => {
    const { result } = renderHook(() => useAvatarImage({ src: "https://example.com/avatar.png" }));
    act(() => result.current.onLoadStart());
    expect(result.current.status).toBe("loading");
    expect(result.current.showImage).toBe(true);
  });

  it("transitions to loaded on load", () => {
    const { result } = renderHook(() => useAvatarImage({ src: "https://example.com/avatar.png" }));
    act(() => result.current.onLoad());
    expect(result.current.status).toBe("loaded");
    expect(result.current.showImage).toBe(true);
  });

  it("transitions to error on error", () => {
    const { result } = renderHook(() => useAvatarImage({ src: "https://example.com/avatar.png" }));
    act(() => result.current.onError());
    expect(result.current.status).toBe("error");
    expect(result.current.showImage).toBe(false);
  });

  it("calls onLoadingStatusChange callback", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useAvatarImage({ src: "https://example.com/avatar.png", onLoadingStatusChange: callback }),
    );

    act(() => result.current.onLoadStart());
    expect(callback).toHaveBeenCalledWith("loading");

    act(() => result.current.onLoad());
    expect(callback).toHaveBeenCalledWith("loaded");
  });

  it("calls onLoadingStatusChange with error", () => {
    const callback = vi.fn();
    const { result } = renderHook(() =>
      useAvatarImage({ src: "https://example.com/avatar.png", onLoadingStatusChange: callback }),
    );

    act(() => result.current.onError());
    expect(callback).toHaveBeenCalledWith("error");
  });

  it("showImage is false when src is empty string", () => {
    const { result } = renderHook(() => useAvatarImage({ src: "" }));
    expect(result.current.showImage).toBe(false);
  });
});
