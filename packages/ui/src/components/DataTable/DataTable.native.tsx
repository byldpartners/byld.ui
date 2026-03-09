import { useState, useMemo, useCallback } from "react";
import { View, Text, Pressable, FlatList, type ViewProps } from "react-native";
import type { ColumnDef, SortDirection } from "./DataTable.types";
import { cn } from "../../utils/cn";

function getCellValue<TData>(column: ColumnDef<TData>, row: TData): unknown {
  if (column.accessorFn) return column.accessorFn(row);
  if (column.accessorKey) return row[column.accessorKey];
  return undefined;
}

interface DataTableNativeProps<TData> extends ViewProps {
  columns: ColumnDef<TData>[];
  data: TData[];
}

function DataTable<TData>({
  columns,
  data,
  ...props
}: DataTableNativeProps<TData>) {
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

  const renderHeader = () => (
    <View className="flex-row border-b border-border bg-background">
      {columns.map((column) => (
        <Pressable
          key={column.id}
          onPress={column.sortable ? () => handleSort(column.id) : undefined}
          className="flex-1 px-2 py-2.5 flex-row items-center"
        >
          <Text className="font-medium text-xs text-muted-foreground">
            {column.header}
            {column.sortable && sortColumn === column.id
              ? sortDirection === "asc"
                ? " \u2191"
                : " \u2193"
              : ""}
          </Text>
        </Pressable>
      ))}
    </View>
  );

  const renderRow = ({ item, index }: { item: TData; index: number }) => (
    <View
      className={cn(
        "flex-row border-b border-border",
        index % 2 === 0 ? "bg-background" : "bg-muted",
      )}
    >
      {columns.map((column) => {
        const value = getCellValue(column, item);
        return (
          <View
            key={column.id}
            className="flex-1 px-2 py-2.5 justify-center"
          >
            {column.cell ? (
              column.cell(value, item)
            ) : (
              <Text className="text-sm text-foreground">
                {String(value ?? "")}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );

  return (
    <View className="overflow-hidden" {...props}>
      {renderHeader()}
      <FlatList
        data={sortedData}
        renderItem={renderRow}
        keyExtractor={(_: TData, index: number) => String(index)}
        ListEmptyComponent={
          <View className="p-6 items-center">
            <Text className="text-muted-foreground text-sm">No results.</Text>
          </View>
        }
      />
    </View>
  );
}
DataTable.displayName = "DataTable";

export { DataTable };
export type { DataTableNativeProps };
