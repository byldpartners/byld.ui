import { View, Text, Pressable, FlatList, type ViewProps } from "react-native";
import type { DataTableProps } from "./DataTable.types";
import { useDataTable, getCellValue } from "./useDataTable";
import { cn } from "../../utils/cn";

interface DataTableNativeProps<TData> extends DataTableProps<TData>, ViewProps {}

function DataTable<TData>({
  columns,
  data,
  ...props
}: DataTableNativeProps<TData>) {
  const { sortColumn, sortDirection, sortedData, handleSort } = useDataTable({
    columns,
    data,
  });

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
