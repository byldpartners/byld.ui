import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "./Tooltip.web";

describe("Tooltip", () => {
  it("renders trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.getByText("Hover me")).toBeDefined();
  });

  it("content is hidden by default", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    expect(screen.queryByText("Tip")).toBeNull();
  });

  it("shows content when open", () => {
    render(
      <TooltipProvider>
        <Tooltip open>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent>Tip</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    );
    // Radix renders tooltip text twice (visible + sr-only), so use getAllByText
    expect(screen.getAllByText("Tip").length).toBeGreaterThan(0);
  });
});
