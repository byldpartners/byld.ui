import { describe, it, expect } from "vitest";
import { useProgress } from "./useProgress";

describe("useProgress", () => {
  it("defaults to 0% when no args", () => {
    const result = useProgress();
    expect(result.clampedValue).toBe(0);
    expect(result.percentage).toBe(0);
    expect(result.max).toBe(100);
  });

  it("computes percentage correctly", () => {
    const result = useProgress({ value: 50, max: 100 });
    expect(result.percentage).toBe(0.5);
  });

  it("clamps value to min 0", () => {
    const result = useProgress({ value: -10, max: 100 });
    expect(result.clampedValue).toBe(0);
    expect(result.percentage).toBe(0);
  });

  it("clamps value to max", () => {
    const result = useProgress({ value: 150, max: 100 });
    expect(result.clampedValue).toBe(100);
    expect(result.percentage).toBe(1);
  });

  it("handles custom max", () => {
    const result = useProgress({ value: 25, max: 50 });
    expect(result.clampedValue).toBe(25);
    expect(result.percentage).toBe(0.5);
  });

  it("handles max=0 without division by zero", () => {
    const result = useProgress({ value: 10, max: 0 });
    expect(result.percentage).toBe(0);
  });

  it("returns 100% when value equals max", () => {
    const result = useProgress({ value: 100, max: 100 });
    expect(result.percentage).toBe(1);
  });
});
