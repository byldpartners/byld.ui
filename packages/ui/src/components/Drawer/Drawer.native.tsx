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
  type ViewProps,
  type TextProps,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  DrawerProps,
  DrawerTriggerProps,
  DrawerContentProps,
  DrawerHeaderProps,
  DrawerFooterProps,
  DrawerTitleProps,
  DrawerDescriptionProps,
  DrawerCloseProps,
} from "./Drawer.types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface DrawerContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DrawerContext = createContext<DrawerContextValue>({
  open: false,
  onOpenChange: () => {},
});

function Drawer({
  children,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
}: DrawerProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;
  const onOpenChange = controlledOnOpenChange ?? setUncontrolledOpen;

  return (
    <DrawerContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DrawerContext.Provider>
  );
}
Drawer.displayName = "Drawer";

interface DrawerTriggerNativeProps extends DrawerTriggerProps {
  onPress?: () => void;
}

function DrawerTrigger({ children, onPress }: DrawerTriggerNativeProps) {
  const { onOpenChange } = useContext(DrawerContext);
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
DrawerTrigger.displayName = "DrawerTrigger";

interface DrawerContentNativeProps extends DrawerContentProps {
  className?: string;
}

function DrawerContent({ children, className }: DrawerContentNativeProps) {
  const { open, onOpenChange } = useContext(DrawerContext);
  const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  useEffect(() => {
    if (open) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 20,
        stiffness: 150,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [open, translateY]);

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <Pressable
        className="flex-1 bg-black/50 justify-end"
        onPress={() => onOpenChange(false)}
      >
        <Animated.View
          className={cn(
            "bg-background rounded-t-xl pb-8",
            className,
          )}
          style={{
            maxHeight: SCREEN_HEIGHT * 0.85,
            transform: [{ translateY }],
          }}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="w-[100px] h-1.5 bg-border rounded-full self-center mt-3 mb-2" />
            {children}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
DrawerContent.displayName = "DrawerContent";

interface DrawerHeaderNativeProps extends DrawerHeaderProps {
  className?: string;
}

function DrawerHeader({ children, className }: DrawerHeaderNativeProps) {
  return (
    <View className={cn("p-4 items-center", className)}>
      {children}
    </View>
  );
}
DrawerHeader.displayName = "DrawerHeader";

interface DrawerFooterNativeProps extends DrawerFooterProps {
  className?: string;
}

function DrawerFooter({ children, className }: DrawerFooterNativeProps) {
  return (
    <View className={cn("p-4 gap-2", className)}>
      {children}
    </View>
  );
}
DrawerFooter.displayName = "DrawerFooter";

interface DrawerTitleNativeProps extends DrawerTitleProps {
  className?: string;
}

function DrawerTitle({ children, className }: DrawerTitleNativeProps) {
  return (
    <Text className={cn("text-lg font-semibold text-foreground", className)}>
      {children}
    </Text>
  );
}
DrawerTitle.displayName = "DrawerTitle";

interface DrawerDescriptionNativeProps extends DrawerDescriptionProps {
  className?: string;
}

function DrawerDescription({ children, className }: DrawerDescriptionNativeProps) {
  return (
    <Text className={cn("text-sm text-muted-foreground mt-1", className)}>
      {children}
    </Text>
  );
}
DrawerDescription.displayName = "DrawerDescription";

interface DrawerCloseNativeProps extends DrawerCloseProps {
  onPress?: () => void;
}

function DrawerClose({ children, onPress }: DrawerCloseNativeProps) {
  const { onOpenChange } = useContext(DrawerContext);
  return (
    <Pressable
      onPress={() => {
        onOpenChange(false);
        onPress?.();
      }}
    >
      {children || (
        <Text className="text-sm text-muted-foreground text-center">
          Close
        </Text>
      )}
    </Pressable>
  );
}
DrawerClose.displayName = "DrawerClose";

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
};
