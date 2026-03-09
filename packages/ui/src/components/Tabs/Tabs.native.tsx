import { useState, createContext, useContext } from "react";
import { View, Text, Pressable, type ViewProps } from "react-native";
import { cn } from "../../utils/cn";
import type {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from "./Tabs.types";

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("useTabs must be used within a <Tabs />");
  }
  return context;
}

type TabsNativeProps = TabsProps & Omit<ViewProps, "className">;

function Tabs({
  defaultValue = "",
  value: controlledValue,
  onValueChange,
  children,
  ...props
}: TabsNativeProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const handleValueChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <View {...props}>{children}</View>
    </TabsContext.Provider>
  );
}
Tabs.displayName = "Tabs";

type TabsListNativeProps = TabsListProps & Omit<ViewProps, "className">;

function TabsList({ children, className, ...props }: TabsListNativeProps) {
  return (
    <View
      className={cn(
        "flex-row items-center bg-secondary rounded-lg p-1",
        className,
      )}
      {...props}
    >
      {children}
    </View>
  );
}
TabsList.displayName = "TabsList";

type TabsTriggerNativeProps = TabsTriggerProps & Omit<ViewProps, "className">;

function TabsTrigger({
  value: triggerValue,
  children,
  disabled,
  className,
  ...props
}: TabsTriggerNativeProps) {
  const { value, onValueChange } = useTabs();
  const isActive = value === triggerValue;

  return (
    <Pressable
      onPress={() => !disabled && onValueChange(triggerValue)}
      disabled={disabled}
      className={cn(
        "flex-1 items-center justify-center px-3 py-1.5 rounded-md",
        isActive && "bg-background shadow-sm elevation-2",
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <Text
          className={cn(
            "text-sm font-medium",
            isActive ? "text-foreground" : "text-muted-foreground",
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
TabsTrigger.displayName = "TabsTrigger";

type TabsContentNativeProps = TabsContentProps & Omit<ViewProps, "className">;

function TabsContent({
  value: contentValue,
  children,
  className,
  ...props
}: TabsContentNativeProps) {
  const { value } = useTabs();

  if (value !== contentValue) {
    return null;
  }

  return (
    <View className={cn("mt-2", className)} {...props}>
      {children}
    </View>
  );
}
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
export type {
  TabsNativeProps,
  TabsListNativeProps,
  TabsTriggerNativeProps,
  TabsContentNativeProps,
};
