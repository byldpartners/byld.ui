import React from "react";
import {
  Pressable,
  Text,
  View,
  type ViewProps,
  type TextProps,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  BreadcrumbProps,
  BreadcrumbListProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbPageProps,
  BreadcrumbSeparatorProps,
  BreadcrumbEllipsisProps,
} from "./Breadcrumb.types";

// --- Breadcrumb ---

interface BreadcrumbNativeProps extends BreadcrumbProps, ViewProps {}

function Breadcrumb({ children, className, ...props }: BreadcrumbNativeProps) {
  return (
    <View
      accessibilityRole="header"
      className={cn("flex-row", className)}
      {...props}
    >
      {children}
    </View>
  );
}
Breadcrumb.displayName = "Breadcrumb";

// --- BreadcrumbList ---

interface BreadcrumbListNativeProps extends BreadcrumbListProps, ViewProps {}

function BreadcrumbList({
  children,
  className,
  ...props
}: BreadcrumbListNativeProps) {
  return (
    <View
      className={cn("flex-row flex-wrap items-center gap-1.5", className)}
      {...props}
    >
      {children}
    </View>
  );
}
BreadcrumbList.displayName = "BreadcrumbList";

// --- BreadcrumbItem ---

interface BreadcrumbItemNativeProps extends BreadcrumbItemProps, ViewProps {}

function BreadcrumbItem({
  children,
  className,
  ...props
}: BreadcrumbItemNativeProps) {
  return (
    <View
      className={cn("flex-row items-center gap-1.5", className)}
      {...props}
    >
      {children}
    </View>
  );
}
BreadcrumbItem.displayName = "BreadcrumbItem";

// --- BreadcrumbLink ---

interface BreadcrumbLinkNativeProps extends BreadcrumbLinkProps {}

function BreadcrumbLink({
  children,
  onPress,
}: BreadcrumbLinkNativeProps) {
  return (
    <Pressable onPress={onPress}>
      {typeof children === "string" ? (
        <Text className="text-sm text-muted-foreground">
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
BreadcrumbLink.displayName = "BreadcrumbLink";

// --- BreadcrumbPage ---

interface BreadcrumbPageNativeProps extends BreadcrumbPageProps, TextProps {}

function BreadcrumbPage({
  children,
  className,
  ...props
}: BreadcrumbPageNativeProps) {
  return (
    <Text
      className={cn("text-sm font-normal text-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
BreadcrumbPage.displayName = "BreadcrumbPage";

// --- BreadcrumbSeparator ---

interface BreadcrumbSeparatorNativeProps extends BreadcrumbSeparatorProps {}

function BreadcrumbSeparator({ children }: BreadcrumbSeparatorNativeProps) {
  return (
    <Text className="text-sm text-muted-foreground">
      {children ?? "/"}
    </Text>
  );
}
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// --- BreadcrumbEllipsis ---

function BreadcrumbEllipsis(_props: BreadcrumbEllipsisProps) {
  return (
    <View className="h-9 w-9 items-center justify-center">
      <Text className="text-sm text-muted-foreground">{"\u2026"}</Text>
    </View>
  );
}
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
export type {
  BreadcrumbNativeProps,
  BreadcrumbListNativeProps,
  BreadcrumbItemNativeProps,
  BreadcrumbLinkNativeProps,
  BreadcrumbPageNativeProps,
  BreadcrumbSeparatorNativeProps,
};
