import { forwardRef, useState, useMemo, useCallback } from "react";
import { cn } from "../../utils/cn";
import type { ColumnDef, SortDirection, DataTableProps } from "./DataTable.types";

function getCellValue<TData>(column: ColumnDef<TData>, row: TData): unknown {
  if (column.accessorFn) return column.accessorFn(row);
  if (column.accessorKey) return row[column.accessorKey];
  return undefined;
}

function DataTableInner<TData>(
  {
    columns,
    data,
    className,
    ...props
  }: DataTableProps<TData> & React.HTMLAttributes<HTMLDivElement>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = useCallback(
    (columnId: string) => {
      if (sortColumn === columnId) {
        if (sortDirection === "asc") {
          setSortDirection("desc");
        } else if (sortDirection === "desc") {
          setSortColumn(null);
          setSortDirection(null);
        }
      } else {
        setSortColumn(columnId);
        setSortDirection("asc");
      }
    },
    [sortColumn, sortDirection],
  );

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    const column = columns.find((c) => c.id === sortColumn);
    if (!column) return data;

    return [...data].sort((a, b) => {
      const aVal = getCellValue(column, a);
      const bVal = getCellValue(column, b);

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      const comparison =
        typeof aVal === "string" && typeof bVal === "string"
          ? aVal.localeCompare(bVal)
          : Number(aVal) - Number(bVal);

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, columns, sortColumn, sortDirection]);

  return (
    <div ref={ref} className={cn("relative w-full overflow-auto", className)} {...props}>
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50">
            {columns.map((column) => (
              <th
                key={column.id}
                className={cn(
                  "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
                  column.sortable && "cursor-pointer select-none",
                )}
                onClick={
                  column.sortable ? () => handleSort(column.id) : undefined
                }
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {column.sortable && sortColumn === column.id && (
                    <span className="ml-1 text-xs">
                      {sortDirection === "asc" ? "\u2191" : "\u2193"}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No results.
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {columns.map((column) => {
                  const value = getCellValue(column, row);
                  return (
                    <td
                      key={column.id}
                      className="p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]"
                    >
                      {column.cell ? column.cell(value, row) : String(value ?? "")}
                    </td>
                  );
                })}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const DataTable = forwardRef(DataTableInner) as <TData>(
  props: DataTableProps<TData> &
    React.HTMLAttributes<HTMLDivElement> & {
      ref?: React.ForwardedRef<HTMLDivElement>;
    },
) => React.ReactElement;

export { DataTable };
export type { ColumnDef };
