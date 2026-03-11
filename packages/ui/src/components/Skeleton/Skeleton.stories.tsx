import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./Skeleton.web";

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  render: () => <Skeleton style={{ width: 200, height: 20 }} />,
};

export const Card: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <Skeleton
        style={{ width: 48, height: 48, borderRadius: "50%" }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <Skeleton style={{ width: 200, height: 16 }} />
        <Skeleton style={{ width: 150, height: 16 }} />
      </div>
    </div>
  ),
};
