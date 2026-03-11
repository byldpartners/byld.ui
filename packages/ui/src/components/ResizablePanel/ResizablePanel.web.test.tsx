import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ResizablePanel.web";

// react-resizable-panels requires ResizeObserver
beforeAll(() => {
  global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ResizablePanelGroup", () => {
  it("renders children panels", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>Left</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>Right</ResizablePanel>
      </ResizablePanelGroup>,
    );
    expect(screen.getByText("Left")).toBeDefined();
    expect(screen.getByText("Right")).toBeDefined();
  });

  it("merges custom className on group", () => {
    const { container } = render(
      <ResizablePanelGroup direction="horizontal" className="my-group">
        <ResizablePanel defaultSize={100}>content</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const group = container.firstChild as HTMLElement;
    expect(group.className).toContain("my-group");
  });

  it("renders handle with visual grip when withHandle", () => {
    render(
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={50}>Left</ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>Right</ResizablePanel>
      </ResizablePanelGroup>,
    );
    const handle = screen.getByRole("separator");
    expect(handle.querySelector("svg")).not.toBeNull();
  });
});
