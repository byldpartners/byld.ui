import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "./HoverCard.web";

describe("HoverCard", () => {
  it("renders trigger", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>,
    );
    expect(screen.getByText("Hover me")).toBeDefined();
  });

  it("content is hidden by default", () => {
    render(
      <HoverCard>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>,
    );
    expect(screen.queryByText("Card content")).toBeNull();
  });

  it("shows content when open", () => {
    render(
      <HoverCard open>
        <HoverCardTrigger>Hover me</HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>,
    );
    expect(screen.getByText("Card content")).toBeDefined();
  });
});
