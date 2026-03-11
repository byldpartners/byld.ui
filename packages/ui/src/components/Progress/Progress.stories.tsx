import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./Progress.web";

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Progress value={60} />
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Progress value={0} />
    </div>
  ),
};

export const Full: Story = {
  render: () => (
    <div style={{ width: 300 }}>
      <Progress value={100} />
    </div>
  ),
};
