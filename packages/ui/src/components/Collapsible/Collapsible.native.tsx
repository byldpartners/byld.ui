import { useState, createContext, useContext } from "react";
import {
  View,
  Pressable,
  LayoutAnimation,
  Platform,
  UIManager,
  type ViewProps,
  type PressableProps,
} from "react-native";
import type {
  CollapsibleProps,
  CollapsibleTriggerProps,
  CollapsibleContentProps,
} from "./Collapsible.types";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface CollapsibleContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  disabled: boolean;
}

const CollapsibleContext = createContext<CollapsibleContextValue>({
  open: false,
  onOpenChange: () => {},
  disabled: false,
});

interface CollapsibleNativeProps extends CollapsibleProps, ViewProps {}

function Collapsible({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  children,
  ...props
}: CollapsibleNativeProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  const handleOpenChange = (next: boolean) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (controlledOpen === undefined) {
      setInternalOpen(next);
    }
    onOpenChange?.(next);
  };

  return (
    <CollapsibleContext.Provider
      value={{ open: isOpen, onOpenChange: handleOpenChange, disabled }}
    >
      <View {...props}>{children}</View>
    </CollapsibleContext.Provider>
  );
}

interface CollapsibleTriggerNativeProps extends Omit<CollapsibleTriggerProps, "asChild" | "children">, PressableProps {}

function CollapsibleTrigger({
  children,
  ...props
}: CollapsibleTriggerNativeProps) {
  const { open, onOpenChange, disabled } = useContext(CollapsibleContext);

  return (
    <Pressable
      onPress={() => onOpenChange(!open)}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      {...props}
    >
      {children}
    </Pressable>
  );
}

interface CollapsibleContentNativeProps extends CollapsibleContentProps, ViewProps {}

function CollapsibleContent({
  children,
  ...props
}: CollapsibleContentNativeProps) {
  const { open } = useContext(CollapsibleContext);

  if (!open) return null;

  return <View {...props}>{children}</View>;
}

Collapsible.displayName = "Collapsible";
CollapsibleTrigger.displayName = "CollapsibleTrigger";
CollapsibleContent.displayName = "CollapsibleContent";

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
export type {
  CollapsibleNativeProps,
  CollapsibleTriggerNativeProps,
  CollapsibleContentNativeProps,
};
