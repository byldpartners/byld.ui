import { useState, useMemo, useCallback } from "react";
import type { ColumnDef, SortDirection } from "./DataTable.types";

function getCellValue<TData>(column: ColumnDef<TData>, row: TData): unknown {
  if (column.accessorFn) return column.accessorFn(row);
  if (column.accessorKey) return row[column.accessorKey];
  return undefined;
}

interface UseDataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

export function useDataTable<TData>({ columns, data }: UseDataTableProps<TData>) {
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

  return {
    sortColumn,
    sortDirection,
    sortedData,
    handleSort,
    getCellValue,
  };
}

export { getCellValue };
