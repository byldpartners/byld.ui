import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button, buttonVariants } from "./Button.web";

describe("Button", () => {
  it("renders with children", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeDefined();
  });

  it("merges custom className", () => {
    render(<Button className="custom-class">btn</Button>);
    expect(screen.getByRole("button").className).toContain("custom-class");
  });

  it("applies default variant classes", () => {
    render(<Button>btn</Button>);
    const el = screen.getByRole("button");
    expect(el.className).toContain("bg-primary");
  });

  it("applies destructive variant", () => {
    render(<Button variant="destructive">btn</Button>);
    expect(screen.getByRole("button").className).toContain("bg-destructive");
  });

  it("applies outline variant", () => {
    render(<Button variant="outline">btn</Button>);
    expect(screen.getByRole("button").className).toContain("border");
  });

  it("applies size variants", () => {
    render(<Button size="sm">btn</Button>);
    expect(screen.getByRole("button").className).toContain("h-8");
  });

  it("applies icon size", () => {
    render(<Button size="icon">btn</Button>);
    expect(screen.getByRole("button").className).toContain("w-9");
  });

  it("forwards disabled prop", () => {
    render(<Button disabled>btn</Button>);
    expect(screen.getByRole("button")).toHaveProperty("disabled", true);
  });

  it("renders as child element when asChild", () => {
    render(
      <Button asChild>
        <a href="/test">link</a>
      </Button>,
    );
    const link = screen.getByRole("link", { name: "link" });
    expect(link.tagName).toBe("A");
    expect(link.className).toContain("bg-primary");
  });

  it("forwards ref", () => {
    let ref: HTMLButtonElement | null = null;
    render(<Button ref={(el) => { ref = el; }}>btn</Button>);
    expect(ref).toBeInstanceOf(HTMLButtonElement);
  });

  it("buttonVariants generates correct classes", () => {
    const classes = buttonVariants({ variant: "ghost", size: "lg" });
    expect(classes).toContain("hover:bg-accent");
    expect(classes).toContain("h-10");
  });
});
