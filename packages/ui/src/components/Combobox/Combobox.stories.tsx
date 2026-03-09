import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Combobox } from "./Combobox.web";

const meta: Meta<typeof Combobox> = {
  title: "Components/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
];

const ComboboxDemo = () => {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: 250 }}>
      <Combobox
        options={frameworks}
        value={value}
        onValueChange={setValue}
        placeholder="Select a framework..."
        searchPlaceholder="Search frameworks..."
        emptyMessage="No framework found."
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <ComboboxDemo />,
};
