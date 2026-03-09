import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./Textarea.web";

const meta: Meta<typeof Textarea> = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: "Type your message...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Type your message...",
    disabled: true,
  },
};
