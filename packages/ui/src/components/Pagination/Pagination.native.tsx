import { View, Text, Pressable, type ViewProps, type PressableProps } from "react-native";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationNextProps,
  PaginationEllipsisProps,
} from "./Pagination.types";

interface PaginationNativeProps extends PaginationProps, ViewProps {}

function Pagination({ children, className, ...props }: PaginationNativeProps) {
  return (
    <View
      className={cn("flex-row justify-center w-full", className)}
      accessibilityRole="menu"
      {...props}
    >
      {children}
    </View>
  );
}
Pagination.displayName = "Pagination";

interface PaginationContentNativeProps extends PaginationContentProps, ViewProps {}

function PaginationContent({ children, className, ...props }: PaginationContentNativeProps) {
  return (
    <View
      className={cn("flex-row items-center gap-1", className)}
      {...props}
    >
      {children}
    </View>
  );
}
PaginationContent.displayName = "PaginationContent";

interface PaginationItemNativeProps extends PaginationItemProps, ViewProps {}

function PaginationItem({ children, className, ...props }: PaginationItemNativeProps) {
  return (
    <View className={className} {...props}>
      {children}
    </View>
  );
}
PaginationItem.displayName = "PaginationItem";

const paginationLinkVariants = cva(
  "flex-row items-center justify-center rounded-md gap-1 h-9",
  {
    variants: {
      size: {
        default: "px-4 py-2",
        icon: "w-9",
      },
    },
    defaultVariants: {
      size: "icon",
    },
  },
);

interface PaginationLinkNativeProps extends PaginationLinkProps, Omit<PressableProps, "children" | "onPress"> {}

function PaginationLink({
  children,
  isActive = false,
  size = "icon",
  onPress,
  className,
  ...props
}: PaginationLinkNativeProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        paginationLinkVariants({ size }),
        isActive && "border border-border bg-background shadow-sm elevation-1",
        className,
      )}
      accessibilityRole="button"
      accessibilityState={{ selected: isActive }}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium text-foreground">
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
PaginationLink.displayName = "PaginationLink";

interface PaginationPreviousNativeProps extends PaginationPreviousProps, Omit<PressableProps, "children" | "onPress"> {}

function PaginationPrevious({
  children,
  onPress,
  className,
  ...props
}: PaginationPreviousNativeProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-md gap-1 h-9 px-4 py-2",
        className,
      )}
      accessibilityRole="button"
      accessibilityLabel="Go to previous page"
      {...props}
    >
      <Text className="text-sm font-medium text-foreground">{"\u2039"}</Text>
      <Text className="text-sm font-medium text-foreground">
        {children ?? "Previous"}
      </Text>
    </Pressable>
  );
}
PaginationPrevious.displayName = "PaginationPrevious";

interface PaginationNextNativeProps extends PaginationNextProps, Omit<PressableProps, "children" | "onPress"> {}

function PaginationNext({
  children,
  onPress,
  className,
  ...props
}: PaginationNextNativeProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center rounded-md gap-1 h-9 px-4 py-2",
        className,
      )}
      accessibilityRole="button"
      accessibilityLabel="Go to next page"
      {...props}
    >
      <Text className="text-sm font-medium text-foreground">
        {children ?? "Next"}
      </Text>
      <Text className="text-sm font-medium text-foreground">{"\u203A"}</Text>
    </Pressable>
  );
}
PaginationNext.displayName = "PaginationNext";

interface PaginationEllipsisNativeProps extends PaginationEllipsisProps, ViewProps {}

function PaginationEllipsis({ className, ...props }: PaginationEllipsisNativeProps) {
  return (
    <View
      className={cn("h-9 w-9 items-center justify-center", className)}
      accessibilityElementsHidden
      {...props}
    >
      <Text className="text-base text-foreground">{"\u2026"}</Text>
    </View>
  );
}
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationLinkVariants,
};
export type {
  PaginationNativeProps,
  PaginationContentNativeProps,
  PaginationItemNativeProps,
  PaginationLinkNativeProps,
  PaginationPreviousNativeProps,
  PaginationNextNativeProps,
  PaginationEllipsisNativeProps,
};
