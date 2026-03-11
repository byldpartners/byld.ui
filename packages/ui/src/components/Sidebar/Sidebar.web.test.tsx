import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "./Sidebar.web";

function renderSidebar(props: { defaultOpen?: boolean } = {}) {
  return render(
    <SidebarProvider {...props}>
      <Sidebar>
        <SidebarHeader>Header</SidebarHeader>
        <SidebarContent>Content</SidebarContent>
        <SidebarFooter>Footer</SidebarFooter>
      </Sidebar>
      <SidebarTrigger data-testid="trigger" />
    </SidebarProvider>,
  );
}

describe("Sidebar rendering", () => {
  it("renders header, content, footer", () => {
    renderSidebar();
    expect(screen.getByText("Header")).toBeDefined();
    expect(screen.getByText("Content")).toBeDefined();
    expect(screen.getByText("Footer")).toBeDefined();
  });

  it("reflects open state via data-state attribute", () => {
    renderSidebar();
    const sidebar = screen.getByText("Content").closest("[data-state]") as HTMLElement;
    expect(sidebar.getAttribute("data-state")).toBe("expanded");
  });

  it("toggles data-state on trigger click", () => {
    renderSidebar();
    const sidebar = screen.getByText("Content").closest("[data-state]") as HTMLElement;
    fireEvent.click(screen.getByTestId("trigger"));
    expect(sidebar.getAttribute("data-state")).toBe("collapsed");
  });

  it("renders Toggle Sidebar screen reader text", () => {
    renderSidebar();
    expect(screen.getByText("Toggle Sidebar")).toBeDefined();
  });

  it("does not have data-state when collapsible=none", () => {
    render(
      <SidebarProvider>
        <Sidebar collapsible="none" data-testid="sidebar">
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    expect(screen.getByTestId("sidebar").getAttribute("data-state")).toBeNull();
  });

  it("applies order-last when side=right", () => {
    render(
      <SidebarProvider>
        <Sidebar side="right">
          <SidebarContent>Content</SidebarContent>
        </Sidebar>
      </SidebarProvider>,
    );
    const sidebar = screen.getByText("Content").closest("[data-side]") as HTMLElement;
    expect(sidebar.className).toContain("order-last");
    expect(sidebar.getAttribute("data-side")).toBe("right");
  });
});
