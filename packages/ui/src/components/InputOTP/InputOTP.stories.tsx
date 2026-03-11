import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { InputOTP } from "./InputOTP.web";

const meta = {
  title: "Components/InputOTP",
  component: InputOTP,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    length: {
      control: "number",
    },
    disabled: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof InputOTP>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 6,
  },
};

export const FourDigits: Story = {
  args: {
    length: 4,
  },
};

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div>
        <InputOTP {...args} length={6} value={value} onValueChange={setValue} />
        <p className="mt-4 text-sm text-muted-foreground">
          Current value: {value || "(empty)"}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    length: 6,
    disabled: true,
  },
};
