import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "./DataTable.web";
import type { ColumnDef } from "./DataTable.types";

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

const columns: ColumnDef<Payment>[] = [
  {
    id: "status",
    header: "Status",
    accessorKey: "status",
    sortable: true,
  },
  {
    id: "email",
    header: "Email",
    accessorKey: "email",
    sortable: true,
  },
  {
    id: "amount",
    header: "Amount",
    accessorKey: "amount",
    sortable: true,
    cell: (value) => {
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(value as number);
      return formatted;
    },
  },
];

const data: Payment[] = [
  { id: "1", amount: 316, status: "success", email: "alice@example.com" },
  { id: "2", amount: 242, status: "success", email: "bob@example.com" },
  { id: "3", amount: 837, status: "processing", email: "carol@example.com" },
  { id: "4", amount: 874, status: "failed", email: "dave@example.com" },
  { id: "5", amount: 721, status: "pending", email: "eve@example.com" },
];

const meta = {
  title: "Components/DataTable",
  component: DataTable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: columns as ColumnDef<unknown>[],
    data,
  },
};

export const Empty: Story = {
  args: {
    columns: columns as ColumnDef<unknown>[],
    data: [],
  },
};
