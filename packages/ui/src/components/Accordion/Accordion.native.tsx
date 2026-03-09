import { createContext, useCallback, useContext, useRef, useState } from "react";
import {
  Animated,
  LayoutAnimation,
  Pressable,
  Text,
  UIManager,
  View,
  type ViewProps,
} from "react-native";
import type {
  AccordionItemProps,
  AccordionTriggerProps,
  AccordionContentProps,
} from "./Accordion.types";
import { cn } from "../../utils/cn";

let layoutAnimationEnabled = false;
function ensureLayoutAnimationEnabled() {
  if (layoutAnimationEnabled) return;
  try {
    if (typeof UIManager.setLayoutAnimationEnabledExperimental === "function") {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  } catch {
    // no-op on iOS or when unsupported
  }
  layoutAnimationEnabled = true;
}

// --- Context ---

interface AccordionContextValue {
  expandedItems: string[];
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue>({
  expandedItems: [],
  toggle: () => {},
});

interface AccordionItemContextValue {
  value: string;
  isExpanded: boolean;
  disabled: boolean;
}

const AccordionItemContext = createContext<AccordionItemContextValue>({
  value: "",
  isExpanded: false,
  disabled: false,
});

// --- Accordion Root ---

interface AccordionNativeProps extends ViewProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children?: React.ReactNode;
}

function Accordion({
  type = "single",
  collapsible = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  ...props
}: AccordionNativeProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const expandedItems =
    controlledValue !== undefined
      ? Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue]
      : internalValue;

  const toggle = useCallback(
    (itemValue: string) => {
      let next: string[];

      if (type === "single") {
        if (expandedItems.includes(itemValue)) {
          next = collapsible ? [] : expandedItems;
        } else {
          next = [itemValue];
        }
      } else {
        if (expandedItems.includes(itemValue)) {
          next = expandedItems.filter((v) => v !== itemValue);
        } else {
          next = [...expandedItems, itemValue];
        }
      }

      ensureLayoutAnimationEnabled();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      if (controlledValue === undefined) {
        setInternalValue(next);
      }
      onValueChange?.(type === "single" ? (next[0] ?? "") : next);
    },
    [type, collapsible, expandedItems, controlledValue, onValueChange],
  );

  return (
    <AccordionContext.Provider value={{ expandedItems, toggle }}>
      <View {...props}>{children}</View>
    </AccordionContext.Provider>
  );
}
Accordion.displayName = "Accordion";

// --- AccordionItem ---

interface AccordionItemNativeProps extends ViewProps, AccordionItemProps {}

function AccordionItem({
  value,
  disabled = false,
  children,
  ...props
}: AccordionItemNativeProps) {
  const { expandedItems } = useContext(AccordionContext);
  const isExpanded = expandedItems.includes(value);

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded, disabled }}>
      <View className="border-b border-border" {...props}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
}
AccordionItem.displayName = "AccordionItem";

// --- AccordionTrigger ---

interface AccordionTriggerNativeProps extends AccordionTriggerProps {
  onPress?: () => void;
}

function AccordionTrigger({
  children,
  onPress,
  ...props
}: AccordionTriggerNativeProps) {
  const { toggle } = useContext(AccordionContext);
  const { value, isExpanded, disabled } = useContext(AccordionItemContext);
  const rotation = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  const handlePress = useCallback(() => {
    if (disabled) return;
    toggle(value);
    Animated.timing(rotation, {
      toValue: isExpanded ? 0 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
    onPress?.();
  }, [disabled, toggle, value, isExpanded, rotation, onPress]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-between py-4",
        disabled && "opacity-50",
      )}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium flex-1">{children}</Text>
      ) : (
        <View className="flex-1">{children}</View>
      )}
      <Animated.Text
        className="text-sm text-muted-foreground"
        style={{ transform: [{ rotate }] }}
      >
        {"\u25BC"}
      </Animated.Text>
    </Pressable>
  );
}
AccordionTrigger.displayName = "AccordionTrigger";

// --- AccordionContent ---

interface AccordionContentNativeProps extends AccordionContentProps {
  children?: React.ReactNode;
}

function AccordionContent({ children }: AccordionContentNativeProps) {
  const { isExpanded } = useContext(AccordionItemContext);

  if (!isExpanded) return null;

  return (
    <View className="pb-4">
      {typeof children === "string" ? (
        <Text className="text-sm text-muted-foreground">{children}</Text>
      ) : (
        children
      )}
    </View>
  );
}
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
export type { AccordionNativeProps, AccordionItemNativeProps };
