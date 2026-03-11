import {
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  type ViewProps,
  type TextProps,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  SheetSide,
  SheetProps,
  SheetTriggerProps,
  SheetContentProps,
  SheetHeaderProps,
  SheetFooterProps,
  SheetTitleProps,
  SheetDescriptionProps,
  SheetCloseProps,
} from "./Sheet.types";
import { useSheet } from "./useSheet";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = createContext<SheetContextValue>({
  open: false,
  onOpenChange: () => {},
});

function Sheet({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: SheetProps) {
  const { open, onOpenChange } = useSheet({
    open: controlledOpen,
    onOpenChange: controlledOnOpenChange,
  });

  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}
Sheet.displayName = "Sheet";

interface SheetTriggerNativeProps extends SheetTriggerProps {
  onPress?: () => void;
}

function SheetTrigger({ children, onPress }: SheetTriggerNativeProps) {
  const { onOpenChange } = useContext(SheetContext);
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
SheetTrigger.displayName = "SheetTrigger";

function getSlideConfig(side: SheetSide) {
  switch (side) {
    case "top":
      return { axis: "translateY" as const, from: -SCREEN_HEIGHT, contentClassName: "top-0 left-0 right-0" };
    case "bottom":
      return { axis: "translateY" as const, from: SCREEN_HEIGHT, contentClassName: "bottom-0 left-0 right-0" };
    case "left":
      return { axis: "translateX" as const, from: -SCREEN_WIDTH, contentClassName: "top-0 left-0 bottom-0 w-3/4 max-w-[400px]" };
    case "right":
    default:
      return { axis: "translateX" as const, from: SCREEN_WIDTH, contentClassName: "top-0 right-0 bottom-0 w-3/4 max-w-[400px]" };
  }
}

interface SheetContentNativeProps extends SheetContentProps {
  style?: ViewProps["style"];
}

function SheetContent({
  children,
  side = "right",
  style,
}: SheetContentNativeProps) {
  const { open, onOpenChange } = useContext(SheetContext);
  const config = getSlideConfig(side);
  const animValue = useRef(new Animated.Value(config.from)).current;

  useEffect(() => {
    if (open) {
      Animated.spring(animValue, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 150,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: config.from,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [open, animValue, config.from]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        className="flex-1 bg-black/50"
        onPress={() => onOpenChange(false)}
      >
        <Animated.View
          className={cn("absolute bg-background shadow-lg elevation-5", config.contentClassName)}
          style={[
            style,
            { transform: config.axis === "translateX" ? [{ translateX: animValue }] : [{ translateY: animValue }] },
          ]}
        >
          <Pressable
            onPress={(e) => e.stopPropagation()}
            className="flex-1 p-6"
          >
            <Pressable
              className="absolute top-4 right-4 z-10"
              onPress={() => onOpenChange(false)}
            >
              <Text className="text-2xl text-muted-foreground">×</Text>
            </Pressable>
            {children}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
SheetContent.displayName = "SheetContent";

interface SheetHeaderNativeProps extends SheetHeaderProps {
  style?: ViewProps["style"];
}

function SheetHeader({ children, style }: SheetHeaderNativeProps) {
  return <View className="mb-3" style={style}>{children}</View>;
}
SheetHeader.displayName = "SheetHeader";

interface SheetFooterNativeProps extends SheetFooterProps {
  style?: ViewProps["style"];
}

function SheetFooter({ children, style }: SheetFooterNativeProps) {
  return (
    <View
      className="mt-4 flex-row justify-end gap-2"
      style={style}
    >
      {children}
    </View>
  );
}
SheetFooter.displayName = "SheetFooter";

interface SheetTitleNativeProps extends SheetTitleProps {
  style?: TextProps["style"];
}

function SheetTitle({ children, style }: SheetTitleNativeProps) {
  return (
    <Text
      className="text-lg font-semibold text-foreground"
      style={style}
    >
      {children}
    </Text>
  );
}
SheetTitle.displayName = "SheetTitle";

interface SheetDescriptionNativeProps extends SheetDescriptionProps {
  style?: TextProps["style"];
}

function SheetDescription({ children, style }: SheetDescriptionNativeProps) {
  return (
    <Text
      className="text-sm text-muted-foreground mt-1"
      style={style}
    >
      {children}
    </Text>
  );
}
SheetDescription.displayName = "SheetDescription";

interface SheetCloseNativeProps extends SheetCloseProps {
  onPress?: () => void;
}

function SheetClose({ children, onPress }: SheetCloseNativeProps) {
  const { onOpenChange } = useContext(SheetContext);
  return (
    <Pressable
      onPress={() => {
        onOpenChange(false);
        onPress?.();
      }}
    >
      {children || <Text className="text-2xl text-muted-foreground">×</Text>}
    </Pressable>
  );
}
SheetClose.displayName = "SheetClose";

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  SheetClose,
};
