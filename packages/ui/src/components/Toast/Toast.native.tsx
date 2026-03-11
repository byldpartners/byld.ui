import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
} from "react-native";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { toast, useToast, type ToasterToast } from "./useToast";
import type {
  ToastVariant,
  ToastProps,
  ToastProviderProps,
  ToastViewportProps,
  ToastTitleProps,
  ToastDescriptionProps,
  ToastActionProps,
  ToastCloseProps,
} from "./Toast.types";

const toastContainerVariants = cva(
  "flex-row items-center justify-between bg-background rounded-lg border-[0.5px] border-border p-4 shadow-lg elevation-5",
  {
    variants: {
      variant: {
        default: "",
        destructive: "bg-destructive border-destructive",
      } satisfies Record<ToastVariant, string>,
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const toastTitleVariants = cva("text-sm font-semibold", {
  variants: {
    variant: {
      default: "text-foreground",
      destructive: "text-destructive-foreground",
    } satisfies Record<ToastVariant, string>,
  },
  defaultVariants: {
    variant: "default",
  },
});

const toastDescriptionVariants = cva("text-[13px] mt-0.5", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      destructive: "text-destructive-foreground",
    } satisfies Record<ToastVariant, string>,
  },
  defaultVariants: {
    variant: "default",
  },
});

const toastCloseVariants = cva("text-lg", {
  variants: {
    variant: {
      default: "text-muted-foreground",
      destructive: "text-destructive-foreground",
    } satisfies Record<ToastVariant, string>,
  },
  defaultVariants: {
    variant: "default",
  },
});

// ---- Toast UI Components ----

function ToastProvider({ children }: ToastProviderProps) {
  return <>{children}</>;
}
ToastProvider.displayName = "ToastProvider";

function ToastViewport({ children, className }: ToastViewportProps & { children?: ReactNode }) {
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

  const variant = t.variant ?? "default";

  return (
    <Animated.View
      className={cn(toastContainerVariants({ variant }))}
      style={[
        { transform: [{ translateY }], opacity },
      ]}
    >
      <View className="flex-1 mr-2">
        {t.title && (
          <Text className={cn(toastTitleVariants({ variant }))}>
            {t.title}
          </Text>
        )}
        {t.description && (
          <Text className={cn(toastDescriptionVariants({ variant }))}>
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
          <Text className={cn(toastCloseVariants({ variant }))}>
            ×
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

function Toast({ children, className }: ToastProps) {
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

function ToastTitle({ children, className }: ToastTitleProps) {
  return (
    <Text className={cn("text-sm font-semibold text-foreground", className)}>
      {children}
    </Text>
  );
}
ToastTitle.displayName = "ToastTitle";

function ToastDescription({ children, className }: ToastDescriptionProps) {
  return (
    <Text className={cn("text-[13px] text-muted-foreground mt-0.5", className)}>
      {children}
    </Text>
  );
}
ToastDescription.displayName = "ToastDescription";

interface ToastActionNativeProps extends ToastActionProps {
  onPress?: () => void;
}

function ToastAction({
  children,
  onPress,
  className,
}: ToastActionNativeProps) {
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

interface ToastCloseNativeProps extends ToastCloseProps {
  onPress?: () => void;
}

function ToastClose({ onPress }: ToastCloseNativeProps) {
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
  toastContainerVariants,
  toastTitleVariants,
  toastDescriptionVariants,
  toastCloseVariants,
  type ToasterToast,
};
