import {
  createContext,
  useContext,
} from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuSeparatorProps,
  ContextMenuLabelProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
} from "./ContextMenu.types";
import { useContextMenu } from "./useContextMenu";

interface ContextMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ContextMenuContext = createContext<ContextMenuContextValue>({
  open: false,
  onOpenChange: () => {},
});

function ContextMenu({ children }: ContextMenuProps) {
  const { open, onOpenChange } = useContextMenu();
  return (
    <ContextMenuContext.Provider value={{ open, onOpenChange }}>
      {children}
    </ContextMenuContext.Provider>
  );
}
ContextMenu.displayName = "ContextMenu";

function ContextMenuTrigger({ children, className }: ContextMenuTriggerProps) {
  const { onOpenChange } = useContext(ContextMenuContext);
  return (
    <Pressable
      onLongPress={() => onOpenChange(true)}
      delayLongPress={500}
      className={className}
    >
      {children}
    </Pressable>
  );
}
ContextMenuTrigger.displayName = "ContextMenuTrigger";

function ContextMenuContent({ children, className }: ContextMenuContentProps) {
  const { open, onOpenChange } = useContext(ContextMenuContext);

  if (!open) return null;

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onPress={() => onOpenChange(false)}
      >
        <View
          className={cn(
            "bg-popover rounded-lg p-1 min-w-[200px] max-w-[280px] max-h-[400px] shadow-md elevation-3",
            className,
          )}
        >
          <ScrollView bounces={false}>{children}</ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
}
ContextMenuContent.displayName = "ContextMenuContent";

interface ContextMenuItemNativeProps extends ContextMenuItemProps {}

function ContextMenuItem({
  children,
  onSelect,
  disabled,
  className,
}: ContextMenuItemNativeProps) {
  const { onOpenChange } = useContext(ContextMenuContext);
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
      <Text
        className={cn(
          "text-sm text-popover-foreground",
          disabled && "text-muted-foreground",
        )}
      >
        {children}
      </Text>
    </Pressable>
  );
}
ContextMenuItem.displayName = "ContextMenuItem";

function ContextMenuSeparator({ className }: ContextMenuSeparatorProps) {
  return (
    <View className={cn("bg-border my-1 -mx-1 h-[0.5px]", className)} />
  );
}
ContextMenuSeparator.displayName = "ContextMenuSeparator";

function ContextMenuLabel({ children, className }: ContextMenuLabelProps) {
  return (
    <Text
      className={cn(
        "px-3 py-1.5 text-xs font-semibold text-muted-foreground",
        className,
      )}
    >
      {children}
    </Text>
  );
}
ContextMenuLabel.displayName = "ContextMenuLabel";

function ContextMenuCheckboxItem({
  children,
  checked,
  onCheckedChange,
  disabled,
  className,
}: ContextMenuCheckboxItemProps) {
  return (
    <Pressable
      className={cn(
        "flex-row items-center px-3 py-2.5 rounded-sm pl-9",
        disabled && "opacity-50",
        className,
      )}
      disabled={disabled}
      onPress={() => {
        onCheckedChange?.(!checked);
      }}
    >
      <View className="absolute left-3 w-4 h-4 justify-center items-center">
        {checked && <Text className="text-xs text-popover-foreground">✓</Text>}
      </View>
      <Text className="text-sm text-popover-foreground">{children}</Text>
    </Pressable>
  );
}
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

function ContextMenuRadioGroup({ children }: ContextMenuRadioGroupProps) {
  return <>{children}</>;
}
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

function ContextMenuRadioItem({
  children,
  className,
}: ContextMenuRadioItemProps) {
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
      <Text className="text-sm text-popover-foreground">{children}</Text>
    </View>
  );
}
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

function ContextMenuSub({ children }: ContextMenuSubProps) {
  return <>{children}</>;
}
ContextMenuSub.displayName = "ContextMenuSub";

function ContextMenuSubTrigger({ children, className }: ContextMenuSubTriggerProps) {
  return (
    <View
      className={cn(
        "flex-row items-center px-3 py-2.5 rounded-sm",
        className,
      )}
    >
      <Text className="text-sm text-popover-foreground">{children}</Text>
      <Text className="ml-auto text-base text-muted-foreground">›</Text>
    </View>
  );
}
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

function ContextMenuSubContent({ children }: ContextMenuSubContentProps) {
  return <View>{children}</View>;
}
ContextMenuSubContent.displayName = "ContextMenuSubContent";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
