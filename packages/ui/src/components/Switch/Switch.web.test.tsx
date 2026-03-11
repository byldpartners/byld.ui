import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Switch } from "./Switch.web";

describe("Switch", () => {
  it("renders with switch role", () => {
    render(<Switch />);
    expect(screen.getByRole("switch")).toBeDefined();
  });

  it("defaults to unchecked", () => {
    render(<Switch />);
    expect(screen.getByRole("switch").getAttribute("data-state")).toBe("unchecked");
  });

  it("can be checked by default", () => {
    render(<Switch defaultChecked />);
    expect(screen.getByRole("switch").getAttribute("data-state")).toBe("checked");
  });

  it("toggles on click", () => {
    render(<Switch />);
    const sw = screen.getByRole("switch");
    fireEvent.click(sw);
    expect(sw.getAttribute("data-state")).toBe("checked");
  });

  it("calls onCheckedChange", () => {
    const onChange = vi.fn();
    render(<Switch onCheckedChange={onChange} />);
    fireEvent.click(screen.getByRole("switch"));
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("respects disabled", () => {
    render(<Switch disabled />);
    expect(screen.getByRole("switch")).toHaveProperty("disabled", true);
  });

  it("merges custom className", () => {
    render(<Switch className="my-switch" />);
    expect(screen.getByRole("switch").className).toContain("my-switch");
  });
});
