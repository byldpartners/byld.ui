import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Progress } from "./Progress.web";

describe("Progress rendering", () => {
  it("renders with progressbar role", () => {
    render(<Progress value={50} />);
    expect(screen.getByRole("progressbar")).toBeDefined();
  });

  it("applies transform on indicator based on value", () => {
    render(<Progress value={75} />);
    const indicator = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(indicator.style.transform).toBe("translateX(-25%)");
  });

  it("shows 0% when value is 0", () => {
    render(<Progress value={0} />);
    const indicator = screen.getByRole("progressbar").firstChild as HTMLElement;
    expect(indicator.style.transform).toBe("translateX(-100%)");
  });

  it("merges custom className", () => {
    render(<Progress className="my-progress" value={0} />);
    expect(screen.getByRole("progressbar").className).toContain("my-progress");
  });
});
