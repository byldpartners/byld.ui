import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Separator, separatorVariants } from "./Separator.web";

describe("Separator", () => {
  it("renders with role=separator", () => {
    const { container } = render(<Separator decorative={false} />);
    expect(container.querySelector("[role='separator']")).not.toBeNull();
  });

  it("renders as decorative by default (no role)", () => {
    const { container } = render(<Separator />);
    // Decorative separators have role="none"
    expect(container.querySelector("[role='none']")).not.toBeNull();
  });

  it("merges custom className", () => {
    const { container } = render(<Separator className="my-sep" />);
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("my-sep");
  });

  it("separatorVariants generates horizontal classes", () => {
    expect(separatorVariants({ orientation: "horizontal" })).toContain("h-[1px]");
    expect(separatorVariants({ orientation: "horizontal" })).toContain("w-full");
  });

  it("separatorVariants generates vertical classes", () => {
    expect(separatorVariants({ orientation: "vertical" })).toContain("w-[1px]");
    expect(separatorVariants({ orientation: "vertical" })).toContain("h-full");
  });
});
