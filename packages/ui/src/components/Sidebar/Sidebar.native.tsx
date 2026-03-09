import { View, type ViewProps } from "react-native";
import type {
  SidebarProps,
  SidebarHeaderProps,
  SidebarContentProps,
  SidebarFooterProps,
  SidebarTriggerProps,
} from "./Sidebar.types";

/**
 * Sidebar - Native placeholder
 *
 * Sidebars on mobile are typically handled by navigation libraries
 * (e.g., React Navigation's DrawerNavigator). This provides placeholder
 * View wrappers so imports don't break.
 */

function Sidebar({ children, style }: SidebarProps & { style?: ViewProps["style"] }) {
  return <View className="flex-1" style={style}>{children}</View>;
}
Sidebar.displayName = "Sidebar";

function SidebarHeader({ children, style }: SidebarHeaderProps & { style?: ViewProps["style"] }) {
  return <View className="p-2" style={style}>{children}</View>;
}
SidebarHeader.displayName = "SidebarHeader";

function SidebarContent({ children, style }: SidebarContentProps & { style?: ViewProps["style"] }) {
  return <View className="flex-1 p-2" style={style}>{children}</View>;
}
SidebarContent.displayName = "SidebarContent";

function SidebarFooter({ children, style }: SidebarFooterProps & { style?: ViewProps["style"] }) {
  return <View className="p-2" style={style}>{children}</View>;
}
SidebarFooter.displayName = "SidebarFooter";

function SidebarTrigger({ children }: SidebarTriggerProps) {
  // No-op on native — sidebar toggling handled by navigation libraries
  return <>{children}</>;
}
SidebarTrigger.displayName = "SidebarTrigger";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
};
