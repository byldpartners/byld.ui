import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./Card.web";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: "1.5rem" }}>
        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.5rem" }}>
          Card Title
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--color-muted-foreground)" }}>
          This is a basic card component with some example content.
        </p>
      </div>
    ),
    style: { width: 350 },
  },
};

export const Simple: Story = {
  args: {
    children: (
      <div style={{ padding: "1.5rem" }}>
        <p style={{ fontSize: "0.875rem" }}>A simple card with just text content.</p>
      </div>
    ),
    style: { width: 300 },
  },
};
