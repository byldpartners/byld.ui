import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input.web";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Type here...",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Disabled",
    disabled: true,
  },
};

export const WithLabel: Story = {
  decorators: [
    (Story) => (
      <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 500 }}>Email</span>
        <Story />
      </label>
    ),
  ],
  args: {
    type: "email",
    placeholder: "you@example.com",
  },
};
