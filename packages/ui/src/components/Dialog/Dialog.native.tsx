import { useState, createContext, useContext, type ReactNode } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  type ViewProps,
  type TextProps,
} from "react-native";
import type {
  DialogProps,
  DialogTriggerProps,
  DialogContentProps,
  DialogHeaderProps,
  DialogFooterProps,
  DialogTitleProps,
  DialogDescriptionProps,
  DialogCloseProps,
} from "./Dialog.types";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue>({
  open: false,
  onOpenChange: () => {},
});

function Dialog({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}
Dialog.displayName = "Dialog";

interface DialogTriggerNativeProps extends DialogTriggerProps {
  onPress?: () => void;
}

function DialogTrigger({ children, onPress }: DialogTriggerNativeProps) {
  const { onOpenChange } = useContext(DialogContext);
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
DialogTrigger.displayName = "DialogTrigger";

interface DialogContentNativeProps extends DialogContentProps {
  style?: ViewProps["style"];
}

function DialogContent({ children, style }: DialogContentNativeProps) {
  const { open, onOpenChange } = useContext(DialogContext);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-center items-center"
        onPress={() => onOpenChange(false)}
      >
        <Pressable
          className="bg-background rounded-xl p-6 w-[90%] max-w-[500px] shadow-lg"
          onPress={(e) => e.stopPropagation()}
          style={style}
        >
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
DialogContent.displayName = "DialogContent";

interface DialogHeaderNativeProps extends DialogHeaderProps {
  style?: ViewProps["style"];
}

function DialogHeader({ children, style }: DialogHeaderNativeProps) {
  return <View className="mb-3" style={style}>{children}</View>;
}
DialogHeader.displayName = "DialogHeader";

interface DialogFooterNativeProps extends DialogFooterProps {
  style?: ViewProps["style"];
}

function DialogFooter({ children, style }: DialogFooterNativeProps) {
  return (
    <View
      className="mt-4 flex-row justify-end gap-2"
      style={style}
    >
      {children}
    </View>
  );
}
DialogFooter.displayName = "DialogFooter";

interface DialogTitleNativeProps extends DialogTitleProps {
  style?: TextProps["style"];
}

function DialogTitle({ children, style }: DialogTitleNativeProps) {
  return (
    <Text
      className="text-lg font-semibold text-foreground"
      style={style}
    >
      {children}
    </Text>
  );
}
DialogTitle.displayName = "DialogTitle";

interface DialogDescriptionNativeProps extends DialogDescriptionProps {
  style?: TextProps["style"];
}

function DialogDescription({ children, style }: DialogDescriptionNativeProps) {
  return (
    <Text
      className="text-sm text-muted-foreground mt-1"
      style={style}
    >
      {children}
    </Text>
  );
}
DialogDescription.displayName = "DialogDescription";

interface DialogCloseNativeProps extends DialogCloseProps {
  onPress?: () => void;
}

function DialogClose({ children, onPress }: DialogCloseNativeProps) {
  const { onOpenChange } = useContext(DialogContext);

  return (
    <Pressable
      onPress={() => {
        onOpenChange(false);
        onPress?.();
      }}
    >
      {children || (
        <Text className="text-xl text-muted-foreground">×</Text>
      )}
    </Pressable>
  );
}
DialogClose.displayName = "DialogClose";

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
};
