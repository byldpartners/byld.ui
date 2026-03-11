import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { DatePicker } from "./DatePicker.web";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
    },
    placeholder: {
      control: "text",
    },
  },
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div style={{ width: 280 }}>
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <div style={{ width: 280 }}>
        <DatePicker {...args} value={date} onValueChange={setDate} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Pick a date",
  },
};

export const CustomPlaceholder: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    return (
      <div style={{ width: 280 }}>
        <DatePicker
          {...args}
          value={date}
          onValueChange={setDate}
          placeholder="Select your birthday"
        />
      </div>
    );
  },
};
