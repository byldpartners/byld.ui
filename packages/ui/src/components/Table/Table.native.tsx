import { View, Text, type ViewProps } from "react-native";
import { cn } from "../../utils/cn";
import type {
  TableProps,
  TableHeaderProps,
  TableBodyProps,
  TableFooterProps,
  TableRowProps,
  TableHeadProps,
  TableCellProps,
  TableCaptionProps,
} from "./Table.types";

type TableNativeProps = TableProps & Omit<ViewProps, "className">;

function Table({ children, className, ...props }: TableNativeProps) {
  return (
    <View
      className={cn("w-full rounded-lg overflow-hidden", className)}
      {...props}
    >
      {children}
    </View>
  );
}
Table.displayName = "Table";

type TableHeaderNativeProps = TableHeaderProps & Omit<ViewProps, "className">;

function TableHeader({ children, className, ...props }: TableHeaderNativeProps) {
  return (
    <View
      className={cn("border-b border-border", className)}
      {...props}
    >
      {children}
    </View>
  );
}
TableHeader.displayName = "TableHeader";

type TableBodyNativeProps = TableBodyProps & Omit<ViewProps, "className">;

function TableBody({ children, className, ...props }: TableBodyNativeProps) {
  return (
    <View className={className} {...props}>
      {children}
    </View>
  );
}
TableBody.displayName = "TableBody";

type TableFooterNativeProps = TableFooterProps & Omit<ViewProps, "className">;

function TableFooter({ children, className, ...props }: TableFooterNativeProps) {
  return (
    <View
      className={cn("border-t border-border bg-secondary/50", className)}
      {...props}
    >
      {children}
    </View>
  );
}
TableFooter.displayName = "TableFooter";

type TableRowNativeProps = TableRowProps & Omit<ViewProps, "className">;

function TableRow({
  children,
  selected,
  className,
  ...props
}: TableRowNativeProps) {
  return (
    <View
      className={cn(
        "flex-row border-b border-border items-center",
        selected && "bg-secondary",
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}
TableRow.displayName = "TableRow";

type TableHeadNativeProps = TableHeadProps & Omit<ViewProps, "className">;

function TableHead({ children, className, ...props }: TableHeadNativeProps) {
  return (
    <View
      className={cn("flex-1 px-2 py-2.5 justify-center", className)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="font-medium text-xs text-muted-foreground">
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
TableHead.displayName = "TableHead";

type TableCellNativeProps = TableCellProps & Omit<ViewProps, "className">;

function TableCell({ children, className, ...props }: TableCellNativeProps) {
  return (
    <View
      className={cn("flex-1 px-2 py-2 justify-center", className)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm text-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
TableCell.displayName = "TableCell";

type TableCaptionNativeProps = TableCaptionProps & Omit<ViewProps, "className">;

function TableCaption({ children, className, ...props }: TableCaptionNativeProps) {
  return (
    <View
      className={cn("mt-4 items-center", className)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm text-muted-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
};
export type {
  TableNativeProps,
  TableHeaderNativeProps,
  TableBodyNativeProps,
  TableFooterNativeProps,
  TableRowNativeProps,
  TableHeadNativeProps,
  TableCellNativeProps,
  TableCaptionNativeProps,
};
