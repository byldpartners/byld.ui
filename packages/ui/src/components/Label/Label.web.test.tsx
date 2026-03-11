import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Label } from "./Label.web";

describe("Label", () => {
  it("renders a label element", () => {
    render(<Label>Username</Label>);
    const el = screen.getByText("Username");
    expect(el.tagName).toBe("LABEL");
  });

  it("applies base styling", () => {
    render(<Label>Username</Label>);
    expect(screen.getByText("Username").className).toContain("text-sm");
    expect(screen.getByText("Username").className).toContain("font-medium");
  });

  it("merges custom className", () => {
    render(<Label className="my-label">Username</Label>);
    expect(screen.getByText("Username").className).toContain("my-label");
  });

  it("forwards htmlFor prop", () => {
    render(<Label htmlFor="email-input">Email</Label>);
    expect(screen.getByText("Email").getAttribute("for")).toBe("email-input");
  });
});
