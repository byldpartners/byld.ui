import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge, badgeVariants } from "./Badge.web";

describe("Badge", () => {
  it("renders with children", () => {
    render(<Badge>Status</Badge>);
    expect(screen.getByText("Status")).toBeDefined();
  });

  it("applies default variant", () => {
    render(<Badge>tag</Badge>);
    expect(screen.getByText("tag").className).toContain("bg-primary");
  });

  it("applies destructive variant", () => {
    render(<Badge variant="destructive">err</Badge>);
    expect(screen.getByText("err").className).toContain("bg-destructive");
  });

  it("applies secondary variant", () => {
    render(<Badge variant="secondary">sec</Badge>);
    expect(screen.getByText("sec").className).toContain("bg-secondary");
  });

  it("applies outline variant", () => {
    render(<Badge variant="outline">out</Badge>);
    expect(screen.getByText("out").className).toContain("text-foreground");
  });

  it("merges custom className", () => {
    render(<Badge className="my-class">tag</Badge>);
    expect(screen.getByText("tag").className).toContain("my-class");
  });

  it("badgeVariants generates correct classes", () => {
    const classes = badgeVariants({ variant: "destructive" });
    expect(classes).toContain("bg-destructive");
  });
});
