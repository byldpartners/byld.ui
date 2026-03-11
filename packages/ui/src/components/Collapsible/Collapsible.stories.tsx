import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "./Collapsible.web";

const meta = {
  title: "Components/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    style: { width: 360 },
    children: (
      <>
        <CollapsibleTrigger asChild>
          <button>Toggle content</button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          This is the collapsible content. It can contain any elements you want
          to show or hide.
        </CollapsibleContent>
      </>
    ),
  },
};
