import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ScrollArea } from "./ScrollArea.web";

describe("ScrollArea", () => {
  it("renders children", () => {
    render(<ScrollArea>Scrollable content</ScrollArea>);
    expect(screen.getByText("Scrollable content")).toBeDefined();
  });

  it("merges custom className", () => {
    const { container } = render(
      <ScrollArea className="h-48 w-96">Content</ScrollArea>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root.className).toContain("h-48");
    expect(root.className).toContain("w-96");
  });
});
