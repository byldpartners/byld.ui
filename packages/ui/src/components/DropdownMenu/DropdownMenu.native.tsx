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
  DropdownMenuProps,
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuSeparatorProps,
  DropdownMenuLabelProps,
  DropdownMenuCheckboxItemProps,
  DropdownMenuRadioGroupProps,
  DropdownMenuRadioItemProps,
  DropdownMenuSubProps,
  DropdownMenuSubTriggerProps,
  DropdownMenuSubContentProps,
} from "./DropdownMenu.types";
import { useDropdownMenu } from "./useDropdownMenu";

interface DropdownMenuContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DropdownMenuContext = createContext<DropdownMenuContextValue>({
  open: false,
  onOpenChange: () => {},
});

function DropdownMenu({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: DropdownMenuProps) {
  const { open, onOpenChange } = useDropdownMenu({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
  });

  return (
    <DropdownMenuContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DropdownMenuContext.Provider>
  );
}

DropdownMenu.displayName = "DropdownMenu";

interface DropdownMenuTriggerNativeProps extends DropdownMenuTriggerProps {
  onPress?: () => void;
}

function DropdownMenuTrigger({ children, onPress }: DropdownMenuTriggerNativeProps) {
  const { onOpenChange } = useContext(DropdownMenuContext);
  return (
    <Pressable
      onPress={() => {
        onOpenChange(true);
        onPress?.();
      }}
    >
      {children}
    </Pressable>
  );
}
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

interface DropdownMenuContentNativeProps extends DropdownMenuContentProps {}

function DropdownMenuContent({ children, className }: DropdownMenuContentNativeProps) {
  const { open, onOpenChange } = useContext(DropdownMenuContext);

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
DropdownMenuContent.displayName = "DropdownMenuContent";

interface DropdownMenuItemNativeProps extends DropdownMenuItemProps {}

function DropdownMenuItem({
  children,
  onSelect,
  disabled,
  className,
}: DropdownMenuItemNativeProps) {
  const { onOpenChange } = useContext(DropdownMenuContext);
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
DropdownMenuItem.displayName = "DropdownMenuItem";

interface DropdownMenuSeparatorNativeProps extends DropdownMenuSeparatorProps {}

function DropdownMenuSeparator({ className }: DropdownMenuSeparatorNativeProps) {
  return (
    <View
      className={cn("bg-border my-1 -mx-1 h-[0.5px]", className)}
    />
  );
}
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

interface DropdownMenuLabelNativeProps extends DropdownMenuLabelProps {}

function DropdownMenuLabel({ children, className }: DropdownMenuLabelNativeProps) {
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
DropdownMenuLabel.displayName = "DropdownMenuLabel";

interface DropdownMenuCheckboxItemNativeProps extends DropdownMenuCheckboxItemProps {}

function DropdownMenuCheckboxItem({
  children,
  checked,
  onCheckedChange,
  disabled,
  className,
}: DropdownMenuCheckboxItemNativeProps) {
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
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem";

function DropdownMenuRadioGroup({
  children,
}: DropdownMenuRadioGroupProps) {
  return <>{children}</>;
}
DropdownMenuRadioGroup.displayName = "DropdownMenuRadioGroup";

interface DropdownMenuRadioItemNativeProps extends DropdownMenuRadioItemProps {}

function DropdownMenuRadioItem({
  children,
  value: _value,
  className,
}: DropdownMenuRadioItemNativeProps) {
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
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem";

function DropdownMenuSub({ children }: DropdownMenuSubProps) {
  return <>{children}</>;
}
DropdownMenuSub.displayName = "DropdownMenuSub";

interface DropdownMenuSubTriggerNativeProps extends DropdownMenuSubTriggerProps {}

function DropdownMenuSubTrigger({ children, className }: DropdownMenuSubTriggerNativeProps) {
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
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

function DropdownMenuSubContent({ children }: DropdownMenuSubContentProps) {
  return <View>{children}</View>;
}
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
