import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "./RadioGroup.web";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <RadioGroupItem value="option-one" id="option-one" />
        <label htmlFor="option-one">Option One</label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <RadioGroupItem value="option-two" id="option-two" />
        <label htmlFor="option-two">Option Two</label>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <RadioGroupItem value="option-three" id="option-three" />
        <label htmlFor="option-three">Option Three</label>
      </div>
    </RadioGroup>
  ),
};
