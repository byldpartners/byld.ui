import {
  View,
  Text,
  Pressable,
  ScrollView,
  type ViewProps,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  NavigationMenuProps,
  NavigationMenuListProps,
  NavigationMenuItemProps,
  NavigationMenuTriggerProps,
  NavigationMenuContentProps,
  NavigationMenuLinkProps,
} from "./NavigationMenu.types";

interface NavigationMenuNativeProps extends NavigationMenuProps {}

function NavigationMenu({ children, className }: NavigationMenuNativeProps) {
  return (
    <View className={cn("flex-row items-center", className)}>
      {children}
    </View>
  );
}
NavigationMenu.displayName = "NavigationMenu";

interface NavigationMenuListNativeProps extends NavigationMenuListProps {}

function NavigationMenuList({ children }: NavigationMenuListNativeProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: "row", alignItems: "center", gap: 4 }}
    >
      {children}
    </ScrollView>
  );
}
NavigationMenuList.displayName = "NavigationMenuList";

interface NavigationMenuItemNativeProps extends NavigationMenuItemProps {}

function NavigationMenuItem({ children, className }: NavigationMenuItemNativeProps) {
  return <View className={className}>{children}</View>;
}
NavigationMenuItem.displayName = "NavigationMenuItem";

interface NavigationMenuTriggerNativeProps extends NavigationMenuTriggerProps {
  onPress?: () => void;
}

function NavigationMenuTrigger({
  children,
  onPress,
  className,
}: NavigationMenuTriggerNativeProps) {
  return (
    <Pressable
      className={cn(
        "px-4 py-2 rounded-md bg-transparent",
        className,
      )}
      onPress={onPress}
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
NavigationMenuTrigger.displayName = "NavigationMenuTrigger";

interface NavigationMenuContentNativeProps extends NavigationMenuContentProps {}

function NavigationMenuContent({ children, className }: NavigationMenuContentNativeProps) {
  return <View className={cn("p-4", className)}>{children}</View>;
}
NavigationMenuContent.displayName = "NavigationMenuContent";

interface NavigationMenuLinkNativeProps extends NavigationMenuLinkProps {}

function NavigationMenuLink({
  children,
  onPress,
  active,
  className,
}: NavigationMenuLinkNativeProps) {
  return (
    <Pressable
      className={cn(
        "px-4 py-2 rounded-md",
        active && "bg-accent",
        className,
      )}
      onPress={onPress}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            "text-sm font-medium text-foreground",
            active && "font-semibold",
          )}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
NavigationMenuLink.displayName = "NavigationMenuLink";

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
};
