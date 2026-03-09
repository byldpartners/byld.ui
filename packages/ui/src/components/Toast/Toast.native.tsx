import {
  useState,
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  type ViewProps,
  type TextProps,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  ToastVariant,
  ToastProviderProps,
  ToastTitleProps,
  ToastDescriptionProps,
} from "./Toast.types";

interface ToasterToast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  action?: { label: string; onPress: () => void };
  duration?: number;
}

// ---- Global toast state ----

let toastCount = 0;
function genId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

const toastListeners: Array<(toasts: ToasterToast[]) => void> = [];
let toastState: ToasterToast[] = [];

function notifyListeners() {
  toastListeners.forEach((l) => l([...toastState]));
}

function toast(props: Omit<ToasterToast, "id">) {
  const id = genId();
  const newToast: ToasterToast = { ...props, id };
  toastState = [newToast, ...toastState];
  notifyListeners();
  return {
    id,
    dismiss: () => {
      toastState = toastState.filter((t) => t.id !== id);
      notifyListeners();
    },
  };
}

function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>(toastState);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      const idx = toastListeners.indexOf(setToasts);
      if (idx > -1) toastListeners.splice(idx, 1);
    };
  }, []);

  const dismiss = useCallback((id?: string) => {
    if (id) {
      toastState = toastState.filter((t) => t.id !== id);
    } else {
      toastState = [];
    }
    notifyListeners();
  }, []);

  return { toasts, toast, dismiss };
}

// ---- Toast UI Components ----

function ToastProvider({ children }: ToastProviderProps) {
  return <>{children}</>;
}
ToastProvider.displayName = "ToastProvider";

function ToastViewport({ children, className }: { children?: ReactNode; className?: string }) {
  const { toasts, dismiss } = useToast();

  return (
    <View
      className={cn(
        "absolute top-0 left-0 right-0 z-[100] p-4 gap-2",
        className,
      )}
      style={{ paddingTop: 50 }}
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
      ))}
      {children}
    </View>
  );
}
ToastViewport.displayName = "ToastViewport";

function ToastItem({ toast: t, onDismiss }: { toast: ToasterToast; onDismiss: () => void }) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 15,
        stiffness: 150,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    const duration = t.duration ?? 5000;
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: -100,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => onDismiss());
    }, duration);

    return () => clearTimeout(timer);
  }, [translateY, opacity, t.duration, onDismiss]);

  const isDestructive = t.variant === "destructive";

  return (
    <Animated.View
      className={cn(
        "flex-row items-center justify-between bg-background rounded-lg border-[0.5px] border-border p-4 shadow-lg elevation-5",
        isDestructive && "bg-destructive border-destructive",
      )}
      style={[
        { transform: [{ translateY }], opacity },
      ]}
    >
      <View className="flex-1 mr-2">
        {t.title && (
          <Text
            className={cn(
              "text-sm font-semibold text-foreground",
              isDestructive && "text-destructive-foreground",
            )}
          >
            {t.title}
          </Text>
        )}
        {t.description && (
          <Text
            className={cn(
              "text-[13px] text-muted-foreground mt-0.5",
              isDestructive && "text-destructive-foreground",
            )}
          >
            {t.description}
          </Text>
        )}
      </View>
      <View className="flex-row items-center gap-1">
        {t.action && (
          <Pressable
            className="px-3 py-1.5 rounded-sm border-[0.5px] border-border"
            onPress={t.action.onPress}
          >
            <Text className="text-xs font-medium text-foreground">
              {t.action.label}
            </Text>
          </Pressable>
        )}
        <Pressable onPress={onDismiss} className="p-1">
          <Text
            className={cn(
              "text-lg text-muted-foreground",
              isDestructive && "text-destructive-foreground",
            )}
          >
            ×
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

function Toast({ children, className }: { children?: ReactNode; className?: string }) {
  return (
    <View
      className={cn(
        "flex-row items-center justify-between bg-background rounded-lg border border-border p-4 shadow-lg elevation-5",
        className,
      )}
    >
      {children}
    </View>
  );
}
Toast.displayName = "Toast";

function ToastTitle({ children, className }: Omit<ToastTitleProps, "className"> & { className?: string }) {
  return (
    <Text className={cn("text-sm font-semibold text-foreground", className)}>
      {children}
    </Text>
  );
}
ToastTitle.displayName = "ToastTitle";

function ToastDescription({ children, className }: Omit<ToastDescriptionProps, "className"> & { className?: string }) {
  return (
    <Text className={cn("text-[13px] text-muted-foreground mt-0.5", className)}>
      {children}
    </Text>
  );
}
ToastDescription.displayName = "ToastDescription";

function ToastAction({
  children,
  onPress,
  className,
}: {
  children?: ReactNode;
  altText?: string;
  onPress?: () => void;
  className?: string;
}) {
  return (
    <Pressable
      className={cn(
        "px-3 py-1.5 rounded-sm border border-border",
        className,
      )}
      onPress={onPress}
    >
      {children}
    </Pressable>
  );
}
ToastAction.displayName = "ToastAction";

function ToastClose({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable className="p-1" onPress={onPress}>
      <Text className="text-lg text-muted-foreground">×</Text>
    </Pressable>
  );
}
ToastClose.displayName = "ToastClose";

export {
  Toast,
  ToastProvider,
  ToastViewport,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
  toast,
  useToast,
  type ToasterToast,
};
