import { describe, it, expect } from "vitest";
import { useAspectRatio } from "./useAspectRatio";

describe("useAspectRatio", () => {
  it("defaults to ratio 1 and width 0", () => {
    const result = useAspectRatio();
    expect(result.height).toBe(0);
    expect(result.isReady).toBe(false);
    expect(result.safeRatio).toBe(1);
  });

  it("computes height from width and ratio", () => {
    const result = useAspectRatio({ width: 200, ratio: 16 / 9 });
    expect(result.height).toBeCloseTo(112.5);
    expect(result.isReady).toBe(true);
  });

  it("returns height equal to width when ratio is 1", () => {
    const result = useAspectRatio({ width: 100, ratio: 1 });
    expect(result.height).toBe(100);
  });

  it("returns 0 height when width is 0", () => {
    const result = useAspectRatio({ width: 0, ratio: 16 / 9 });
    expect(result.height).toBe(0);
    expect(result.isReady).toBe(false);
  });

  it("falls back to ratio 1 when ratio is 0", () => {
    const result = useAspectRatio({ width: 100, ratio: 0 });
    expect(result.safeRatio).toBe(1);
    expect(result.height).toBe(100);
  });

  it("falls back to ratio 1 when ratio is negative", () => {
    const result = useAspectRatio({ width: 100, ratio: -2 });
    expect(result.safeRatio).toBe(1);
    expect(result.height).toBe(100);
  });
});
