import type { Meta, StoryObj } from "@storybook/react-vite";
import { Chart } from "./Chart.web";
import type { ChartConfig } from "./Chart.types";

const meta = {
  title: "Components/Chart",
  component: Chart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(221.2 83.2% 53.3%)",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(0 84.2% 60.2%)",
  },
  profit: {
    label: "Profit",
    color: "hsl(142.1 76.2% 36.3%)",
  },
};

export const Default: Story = {
  args: { config: sampleConfig },
  render: () => (
    <Chart config={sampleConfig} style={{ width: 400, height: 250 }}>
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-sm text-muted-foreground">
          Chart container with CSS color variables applied.
        </p>
        <div className="flex gap-4">
          {Object.entries(sampleConfig).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: `var(--color-${key})` }}
              />
              <span className="text-xs">{value.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Wrap Recharts components inside this container for themed charts.
        </p>
      </div>
    </Chart>
  ),
};
