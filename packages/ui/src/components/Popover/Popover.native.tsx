import {
  createContext,
  useContext,
} from "react";
import {
  Modal,
  Pressable,
  type ViewProps,
} from "react-native";
import type {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
} from "./Popover.types";
import { usePopover } from "./usePopover";

interface PopoverContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextValue>({
  open: false,
  onOpenChange: () => {},
});

function Popover({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: PopoverProps) {
  const { open, onOpenChange } = usePopover({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
  });

  return (
    <PopoverContext.Provider value={{ open, onOpenChange }}>
      {children}
    </PopoverContext.Provider>
  );
}
Popover.displayName = "Popover";

interface PopoverTriggerNativeProps extends PopoverTriggerProps {
  onPress?: () => void;
}

function PopoverTrigger({ children, onPress }: PopoverTriggerNativeProps) {
  const { onOpenChange } = useContext(PopoverContext);
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
PopoverTrigger.displayName = "PopoverTrigger";

interface PopoverContentNativeProps extends PopoverContentProps {
  style?: ViewProps["style"];
}

function PopoverContent({ children, style }: PopoverContentNativeProps) {
  const { open, onOpenChange } = useContext(PopoverContext);

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
        <Pressable
          className="bg-background rounded-lg p-4 w-[85%] max-w-[320px] shadow-md elevation-5"
          style={style}
          onPress={(e) => e.stopPropagation()}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
