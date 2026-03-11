import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from "./Sidebar.web";

const meta = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "240px",
          "--sidebar-width-icon": "48px",
          height: 400,
          width: 600,
        } as React.CSSProperties
      }
      className="border rounded-lg overflow-hidden"
    >
      <Sidebar>
        <SidebarHeader>
          <span className="text-lg font-semibold px-2">App Name</span>
        </SidebarHeader>
        <SidebarContent>
          <nav className="flex flex-col gap-1">
            <a href="#" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
              Dashboard
            </a>
            <a href="#" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
              Projects
            </a>
            <a href="#" className="rounded-md px-3 py-2 text-sm hover:bg-accent">
              Settings
            </a>
          </nav>
        </SidebarContent>
        <SidebarFooter>
          <span className="text-xs text-muted-foreground px-2">v1.0.0</span>
        </SidebarFooter>
      </Sidebar>
      <main className="flex-1 p-4">
        <SidebarTrigger />
        <p className="mt-4 text-sm text-muted-foreground">
          Main content area. Click the trigger to toggle the sidebar.
        </p>
      </main>
    </SidebarProvider>
  ),
};

export const RightSide: Story = {
  render: () => (
    <SidebarProvider
      defaultOpen
      style={
        {
          "--sidebar-width": "240px",
          "--sidebar-width-icon": "48px",
          height: 400,
          width: 600,
        } as React.CSSProperties
      }
      className="border rounded-lg overflow-hidden"
    >
      <main className="flex-1 p-4">
        <SidebarTrigger />
        <p className="mt-4 text-sm text-muted-foreground">
          Main content with sidebar on the right.
        </p>
      </main>
      <Sidebar side="right">
        <SidebarHeader>
          <span className="text-lg font-semibold px-2">Details</span>
        </SidebarHeader>
        <SidebarContent>
          <div className="px-3 text-sm">
            <p>Additional information panel.</p>
          </div>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};
