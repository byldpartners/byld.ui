import {
  useState,
  createContext,
  useContext,
} from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  type ViewProps,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  MenubarProps,
  MenubarMenuProps,
  MenubarTriggerProps,
  MenubarContentProps,
  MenubarItemProps,
  MenubarSeparatorProps,
  MenubarSubProps,
  MenubarSubTriggerProps,
  MenubarSubContentProps,
  MenubarCheckboxItemProps,
  MenubarRadioGroupProps,
  MenubarRadioItemProps,
} from "./Menubar.types";

/**
 * Menubar - Native implementation
 *
 * Note: Menubars are inherently web-heavy. This provides a basic horizontal
 * row of menu triggers with modal-based dropdown content.
 */

interface MenubarMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MenubarMenuContext = createContext<MenubarMenuContextValue>({
  open: false,
  onOpenChange: () => {},
});

interface MenubarNativeProps extends MenubarProps {
  className?: string;
}

function Menubar({ children, className }: MenubarNativeProps) {
  return (
    <View
      className={cn(
        "flex-row items-center border-[0.5px] border-border rounded-md bg-background p-1 gap-1",
        className,
      )}
    >
      {children}
    </View>
  );
}
Menubar.displayName = "Menubar";

function MenubarMenu({ children }: MenubarMenuProps) {
  const [open, setOpen] = useState(false);
  return (
    <MenubarMenuContext.Provider value={{ open, onOpenChange: setOpen }}>
      {children}
    </MenubarMenuContext.Provider>
  );
}
MenubarMenu.displayName = "MenubarMenu";

interface MenubarTriggerNativeProps extends MenubarTriggerProps {
  className?: string;
}

function MenubarTrigger({ children, className }: MenubarTriggerNativeProps) {
  const { open, onOpenChange } = useContext(MenubarMenuContext);
  return (
    <Pressable
      className={cn(
        "px-3 py-1.5 rounded-sm",
        open && "bg-accent",
        className,
      )}
      onPress={() => onOpenChange(!open)}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium text-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
MenubarTrigger.displayName = "MenubarTrigger";

interface MenubarContentNativeProps extends MenubarContentProps {
  className?: string;
}

function MenubarContent({ children, className }: MenubarContentNativeProps) {
  const { open, onOpenChange } = useContext(MenubarMenuContext);

  if (!open) return null;

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        className="flex-1 bg-black/30 justify-center items-center"
        onPress={() => onOpenChange(false)}
      >
        <View
          className={cn(
            "bg-popover rounded-lg p-1 min-w-[200px] max-w-[280px] max-h-[400px] shadow-md elevation-5",
            className,
          )}
        >
          <ScrollView bounces={false}>{children}</ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}
MenubarContent.displayName = "MenubarContent";

interface MenubarItemNativeProps extends MenubarItemProps {
  className?: string;
}

function MenubarItem({
  children,
  onSelect,
  disabled,
  className,
}: MenubarItemNativeProps) {
  const { onOpenChange } = useContext(MenubarMenuContext);
  return (
    <Pressable
      className={cn(
        "flex-row items-center px-3 py-2.5 rounded-sm",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
      onPress={() => {
        onSelect?.();
        onOpenChange(false);
      }}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            "text-sm text-popover-foreground",
            disabled && "text-muted-foreground",
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
MenubarItem.displayName = "MenubarItem";

interface MenubarSeparatorNativeProps extends MenubarSeparatorProps {
  className?: string;
}

function MenubarSeparator({ className }: MenubarSeparatorNativeProps) {
  return (
    <View
      className={cn("bg-border my-1 -mx-1 h-[0.5px]", className)}
    />
  );
}
MenubarSeparator.displayName = "MenubarSeparator";

function MenubarSub({ children }: MenubarSubProps) {
  return <>{children}</>;
}
MenubarSub.displayName = "MenubarSub";

interface MenubarSubTriggerNativeProps extends MenubarSubTriggerProps {
  className?: string;
}

function MenubarSubTrigger({ children, className }: MenubarSubTriggerNativeProps) {
  return (
    <View
      className={cn(
        "flex-row items-center px-3 py-2.5 rounded-sm",
        className,
      )}
    >
      {typeof children === "string" ? (
        <Text className="text-sm text-popover-foreground">{children}</Text>
      ) : (
        children
      )}
      <Text className="ml-auto text-base text-muted-foreground">›</Text>
    </View>
  );
}
MenubarSubTrigger.displayName = "MenubarSubTrigger";

function MenubarSubContent({ children }: MenubarSubContentProps) {
  return <View>{children}</View>;
}
MenubarSubContent.displayName = "MenubarSubContent";

interface MenubarCheckboxItemNativeProps extends MenubarCheckboxItemProps {
  disabled?: boolean;
  className?: string;
}

function MenubarCheckboxItem({
  children,
  checked,
  onCheckedChange,
  disabled,
  className,
}: MenubarCheckboxItemNativeProps) {
  return (
    <Pressable
      className={cn(
        "flex-row items-center px-3 py-2.5 rounded-sm pl-9",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
      onPress={() => onCheckedChange?.(!checked)}
    >
      <View className="absolute left-3 w-4 h-4 justify-center items-center">
        {checked && <Text className="text-xs text-popover-foreground">✓</Text>}
      </View>
      {typeof children === "string" ? (
        <Text className="text-sm text-popover-foreground">{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
MenubarCheckboxItem.displayName = "MenubarCheckboxItem";

function MenubarRadioGroup({
  children,
}: MenubarRadioGroupProps) {
  return <>{children}</>;
}
MenubarRadioGroup.displayName = "MenubarRadioGroup";

interface MenubarRadioItemNativeProps extends MenubarRadioItemProps {
  className?: string;
}

function MenubarRadioItem({
  children,
  className,
}: MenubarRadioItemNativeProps) {
  return (
    <View
      className={cn(
        "flex-row items-center px-3 py-2.5 rounded-sm pl-9",
        className,
      )}
    >
      <View className="absolute left-3 w-4 h-4 justify-center items-center">
        <View className="w-1.5 h-1.5 rounded-full bg-popover-foreground" />
      </View>
      {typeof children === "string" ? (
        <Text className="text-sm text-popover-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
MenubarRadioItem.displayName = "MenubarRadioItem";

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
};
