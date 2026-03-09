import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Animated,
  Dimensions,
  StyleSheet,
  type ViewProps,
  type TextProps,
} from "react-native";
import type { SheetSide } from "./Sheet.types";

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
}: {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

  return (
    <SheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
}
Sheet.displayName = "Sheet";

function SheetTrigger({ children, onPress }: { children?: ReactNode; onPress?: () => void }) {
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
      return { axis: "translateY" as const, from: -SCREEN_HEIGHT, contentStyle: styles.contentTop };
    case "bottom":
      return { axis: "translateY" as const, from: SCREEN_HEIGHT, contentStyle: styles.contentBottom };
    case "left":
      return { axis: "translateX" as const, from: -SCREEN_WIDTH, contentStyle: styles.contentLeft };
    case "right":
    default:
      return { axis: "translateX" as const, from: SCREEN_WIDTH, contentStyle: styles.contentRight };
  }
}

function SheetContent({
  children,
  side = "right",
  style,
}: {
  children?: ReactNode;
  side?: SheetSide;
  style?: ViewProps["style"];
}) {
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
          className="absolute bg-background shadow-lg elevation-5"
          style={[
            config.contentStyle,
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

function SheetHeader({ children, style }: { children?: ReactNode; style?: ViewProps["style"] }) {
  return <View className="mb-3" style={style}>{children}</View>;
}
SheetHeader.displayName = "SheetHeader";

function SheetFooter({ children, style }: { children?: ReactNode; style?: ViewProps["style"] }) {
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

function SheetTitle({ children, style }: { children?: ReactNode; style?: TextProps["style"] }) {
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

function SheetDescription({ children, style }: { children?: ReactNode; style?: TextProps["style"] }) {
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

function SheetClose({ children, onPress }: { children?: ReactNode; onPress?: () => void }) {
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

const styles = StyleSheet.create({
  contentRight: {
    top: 0,
    right: 0,
    bottom: 0,
    width: "75%",
    maxWidth: 400,
  },
  contentLeft: {
    top: 0,
    left: 0,
    bottom: 0,
    width: "75%",
    maxWidth: 400,
  },
  contentTop: {
    top: 0,
    left: 0,
    right: 0,
  },
  contentBottom: {
    bottom: 0,
    left: 0,
    right: 0,
  },
});

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
