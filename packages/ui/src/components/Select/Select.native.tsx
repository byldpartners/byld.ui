import { createContext, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  type ViewProps,
} from "react-native";
import { ChevronDown, Check } from "lucide-react-native";
import type { SelectProps } from "./Select.types";
import { useSelect } from "./useSelect";
import { Icon } from "../Icon/Icon.native";
import { cn } from "../../utils/cn";

interface SelectContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContextValue>({
  value: undefined,
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
});

interface SelectNativeProps extends SelectProps {}

function Select({
  value: controlledValue,
  defaultValue,
  onValueChange,
  children,
}: SelectNativeProps) {
  const { value, onValueChange: handleValueChange, open, setOpen } = useSelect({
    value: controlledValue,
    defaultValue,
    onValueChange,
  });

  return (
    <SelectContext.Provider
      value={{ value, onValueChange: handleValueChange, open, setOpen }}
    >
      {children}
    </SelectContext.Provider>
  );
}

interface SelectTriggerNativeProps extends ViewProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

function SelectTrigger({
  children,
  disabled = false,
  style,
  ...props
}: SelectTriggerNativeProps) {
  const { setOpen } = useContext(SelectContext);

  return (
    <Pressable
      onPress={() => !disabled && setOpen(true)}
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-between h-9 w-full rounded-md border border-input px-3 py-2 bg-transparent shadow-sm elevation-1",
        disabled && "opacity-50"
      )}
      style={style}
      {...props}
    >
      {children}
      <View className="opacity-50">
        <Icon icon={ChevronDown} size={16} className="text-muted-foreground" />
      </View>
    </Pressable>
  );
}

interface SelectValueNativeProps {
  placeholder?: string;
}

function SelectValue({ placeholder }: SelectValueNativeProps) {
  const { value } = useContext(SelectContext);

  return (
    <Text
      className={cn(
        "text-sm leading-none flex-1",
        value ? "text-foreground" : "text-muted-foreground"
      )}
    >
      {value || placeholder}
    </Text>
  );
}

interface SelectContentNativeProps {
  children?: React.ReactNode;
}

function SelectContent({ children }: SelectContentNativeProps) {
  const { open, setOpen } = useContext(SelectContext);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
      <Pressable
        onPress={() => setOpen(false)}
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <Pressable
          onPress={(e) => e.stopPropagation()}
          className="bg-popover rounded-lg p-1 min-w-[200px] max-h-[300px] shadow-md elevation-3"
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

interface SelectItemNativeProps {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

function SelectItem({ value, disabled = false, children }: SelectItemNativeProps) {
  const ctx = useContext(SelectContext);
  const isSelected = ctx.value === value;

  return (
    <Pressable
      onPress={() => !disabled && ctx.onValueChange(value)}
      disabled={disabled}
      className={cn(
        "flex-row items-center py-1.5 pl-2 pr-8 rounded-sm",
        isSelected ? "bg-secondary" : "bg-transparent",
        disabled && "opacity-50"
      )}
    >
      <Text className="text-sm text-foreground flex-1">
        {children}
      </Text>
      {isSelected && (
        <Icon icon={Check} size={16} className="text-foreground" />
      )}
    </Pressable>
  );
}

interface SelectGroupNativeProps extends ViewProps {
  children?: React.ReactNode;
}

function SelectGroup({ children, ...props }: SelectGroupNativeProps) {
  return <View {...props}>{children}</View>;
}

interface SelectLabelNativeProps {
  children?: React.ReactNode;
}

function SelectLabel({ children }: SelectLabelNativeProps) {
  return (
    <Text className="text-sm font-semibold px-3 py-1.5 text-foreground">
      {children}
    </Text>
  );
}

function SelectSeparator() {
  return (
    <View className="h-px bg-border my-1 -mx-1" />
  );
}

Select.displayName = "Select";
SelectTrigger.displayName = "SelectTrigger";
SelectValue.displayName = "SelectValue";
SelectContent.displayName = "SelectContent";
SelectItem.displayName = "SelectItem";
SelectGroup.displayName = "SelectGroup";
SelectLabel.displayName = "SelectLabel";
SelectSeparator.displayName = "SelectSeparator";

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
};
export type { SelectNativeProps };
