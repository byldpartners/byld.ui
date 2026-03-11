import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card } from "./Card.web";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeDefined();
  });

  it("applies base classes", () => {
    render(<Card>content</Card>);
    const el = screen.getByText("content");
    expect(el.className).toContain("rounded-xl");
    expect(el.className).toContain("border");
    expect(el.className).toContain("bg-card");
  });

  it("merges custom className", () => {
    render(<Card className="my-card">content</Card>);
    expect(screen.getByText("content").className).toContain("my-card");
  });

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null;
    render(<Card ref={(el) => { ref = el; }}>content</Card>);
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });
});
