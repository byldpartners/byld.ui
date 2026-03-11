import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Skeleton } from "./Skeleton.web";

describe("Skeleton", () => {
  it("renders a div", () => {
    const { container } = render(<Skeleton />);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });

  it("applies animate-pulse class", () => {
    const { container } = render(<Skeleton />);
    expect((container.firstChild as HTMLElement).className).toContain("animate-pulse");
  });

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-10 w-40" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("h-10");
    expect(el.className).toContain("w-40");
  });

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null;
    render(<Skeleton ref={(el) => { ref = el; }} />);
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });

  it("passes through HTML attributes", () => {
    const { container } = render(<Skeleton data-testid="skel" aria-label="loading" />);
    const el = container.firstChild as HTMLElement;
    expect(el.getAttribute("data-testid")).toBe("skel");
    expect(el.getAttribute("aria-label")).toBe("loading");
  });
});
