import { useState, createContext, useContext } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  type ViewProps,
} from "react-native";
import type { SelectProps } from "./Select.types";
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
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

  const handleValueChange = (val: string) => {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onValueChange?.(val);
    setOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange, open, setOpen }}
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
        "flex-row items-center justify-between h-9 w-full rounded-md border border-input px-3 bg-transparent",
        disabled && "opacity-50"
      )}
      style={style}
      {...props}
    >
      {children}
      <Text className="text-xs text-muted-foreground">&#x25BC;</Text>
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
        "text-sm flex-1",
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
          className="bg-popover rounded-lg p-1 min-w-[200px] max-h-[300px] shadow-lg elevation-5"
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
        "flex-row items-center py-2 px-3 rounded-sm",
        isSelected ? "bg-secondary" : "bg-transparent",
        disabled && "opacity-50"
      )}
    >
      <Text className="text-sm text-foreground flex-1">
        {children}
      </Text>
      {isSelected && (
        <Text className="text-sm text-foreground">&#x2713;</Text>
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
