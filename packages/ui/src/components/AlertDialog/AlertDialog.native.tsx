import { createContext, useContext } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  type ViewProps,
  type TextProps,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  AlertDialogProps,
  AlertDialogTriggerProps,
  AlertDialogContentProps,
  AlertDialogHeaderProps,
  AlertDialogFooterProps,
  AlertDialogTitleProps,
  AlertDialogDescriptionProps,
  AlertDialogActionProps,
  AlertDialogCancelProps,
} from "./AlertDialog.types";
import { useAlertDialog } from "./useAlertDialog";

// --- Context ---

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AlertDialogContext = createContext<AlertDialogContextValue>({
  open: false,
  onOpenChange: () => {},
});

// --- AlertDialog Root ---

interface AlertDialogNativeProps extends AlertDialogProps {
  defaultOpen?: boolean;
}

function AlertDialog({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange: controlledOnOpenChange,
  children,
}: AlertDialogNativeProps) {
  const { open, onOpenChange } = useAlertDialog({
    open: controlledOpen,
    defaultOpen,
    onOpenChange: controlledOnOpenChange,
  });

  return (
    <AlertDialogContext.Provider
      value={{ open, onOpenChange }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
}
AlertDialog.displayName = "AlertDialog";

// --- AlertDialogTrigger ---

interface AlertDialogTriggerNativeProps extends AlertDialogTriggerProps {
  onPress?: () => void;
}

function AlertDialogTrigger({
  children,
  onPress,
}: AlertDialogTriggerNativeProps) {
  const { onOpenChange } = useContext(AlertDialogContext);

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
AlertDialogTrigger.displayName = "AlertDialogTrigger";

// --- AlertDialogContent ---

interface AlertDialogContentNativeProps extends AlertDialogContentProps, ViewProps {}

function AlertDialogContent({
  children,
  className,
  ...props
}: AlertDialogContentNativeProps) {
  const { open, onOpenChange } = useContext(AlertDialogContext);

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <View className="flex-1 justify-center items-center p-6" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <View
          className={cn(
            "w-full max-w-lg bg-background rounded-lg p-6 gap-4 shadow-lg elevation-10",
            className,
          )}
          {...props}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}
AlertDialogContent.displayName = "AlertDialogContent";

// --- AlertDialogHeader ---

interface AlertDialogHeaderNativeProps extends AlertDialogHeaderProps, ViewProps {}

function AlertDialogHeader({
  children,
  className,
  ...props
}: AlertDialogHeaderNativeProps) {
  return (
    <View className={cn("gap-2", className)} {...props}>
      {children}
    </View>
  );
}
AlertDialogHeader.displayName = "AlertDialogHeader";

// --- AlertDialogFooter ---

interface AlertDialogFooterNativeProps extends AlertDialogFooterProps, ViewProps {}

function AlertDialogFooter({
  children,
  className,
  ...props
}: AlertDialogFooterNativeProps) {
  return (
    <View
      className={cn("flex-row justify-end gap-2", className)}
      {...props}
    >
      {children}
    </View>
  );
}
AlertDialogFooter.displayName = "AlertDialogFooter";

// --- AlertDialogTitle ---

interface AlertDialogTitleNativeProps extends AlertDialogTitleProps, TextProps {}

function AlertDialogTitle({
  children,
  className,
  ...props
}: AlertDialogTitleNativeProps) {
  return (
    <Text
      className={cn("text-lg font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
AlertDialogTitle.displayName = "AlertDialogTitle";

// --- AlertDialogDescription ---

interface AlertDialogDescriptionNativeProps extends AlertDialogDescriptionProps, TextProps {}

function AlertDialogDescription({
  children,
  className,
  ...props
}: AlertDialogDescriptionNativeProps) {
  return (
    <Text
      className={cn("text-sm text-muted-foreground leading-5", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
AlertDialogDescription.displayName = "AlertDialogDescription";

// --- AlertDialogAction ---

interface AlertDialogActionNativeProps extends AlertDialogActionProps {}

function AlertDialogAction({
  children,
  onPress,
}: AlertDialogActionNativeProps) {
  const { onOpenChange } = useContext(AlertDialogContext);

  return (
    <Pressable
      onPress={() => {
        onPress?.();
        onOpenChange(false);
      }}
      className="bg-primary px-4 rounded-md h-9 items-center justify-center"
    >
      {typeof children === "string" ? (
        <Text className="text-primary-foreground text-sm font-medium">
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
AlertDialogAction.displayName = "AlertDialogAction";

// --- AlertDialogCancel ---

interface AlertDialogCancelNativeProps extends AlertDialogCancelProps {}

function AlertDialogCancel({
  children,
  onPress,
}: AlertDialogCancelNativeProps) {
  const { onOpenChange } = useContext(AlertDialogContext);

  return (
    <Pressable
      onPress={() => {
        onPress?.();
        onOpenChange(false);
      }}
      className="bg-transparent border border-border px-4 rounded-md h-9 items-center justify-center"
    >
      {typeof children === "string" ? (
        <Text className="text-foreground text-sm font-medium">
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
AlertDialogCancel.displayName = "AlertDialogCancel";

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
export type {
  AlertDialogNativeProps,
  AlertDialogTriggerNativeProps,
  AlertDialogContentNativeProps,
  AlertDialogHeaderNativeProps,
  AlertDialogFooterNativeProps,
  AlertDialogTitleNativeProps,
  AlertDialogDescriptionNativeProps,
  AlertDialogActionNativeProps,
  AlertDialogCancelNativeProps,
};
