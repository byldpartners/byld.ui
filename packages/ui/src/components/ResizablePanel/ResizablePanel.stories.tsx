import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "./ResizablePanel.web";

const meta = {
  title: "Components/ResizablePanel",
  component: ResizablePanelGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ResizablePanelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 500, height: 200 }} className="rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Panel One</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Panel Two</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ width: 500, height: 300 }} className="rounded-lg border">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Top Panel</span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Bottom Panel</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};

export const ThreePanels: Story = {
  render: () => (
    <div style={{ width: 500, height: 200 }} className="rounded-lg border">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Left</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={2}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Center</span>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={1}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">Right</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  ),
};
