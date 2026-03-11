export type SortDirection = "asc" | "desc" | null;

export interface ColumnDef<TData> {
  id: string;
  header: string;
  accessorKey?: keyof TData;
  accessorFn?: (row: TData) => unknown;
  cell?: (value: unknown, row: TData) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  className?: string;
}
