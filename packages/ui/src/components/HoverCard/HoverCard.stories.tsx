import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "./HoverCard.web";

const meta: Meta<typeof HoverCard> = {
  title: "Components/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof HoverCard>;

export const Default: Story = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span style={{ textDecoration: "underline", cursor: "pointer" }}>
          Hover me
        </span>
      </HoverCardTrigger>
      <HoverCardContent>
        <p>
          This is additional information that appears when you hover over the
          trigger element.
        </p>
      </HoverCardContent>
    </HoverCard>
  ),
};
