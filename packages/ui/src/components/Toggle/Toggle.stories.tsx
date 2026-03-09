import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "./Toggle.web";

const meta: Meta<typeof Toggle> = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Toggle>;

export const Default: Story = {
  args: {
    children: "Bold",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Bold",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Bold",
  },
};
