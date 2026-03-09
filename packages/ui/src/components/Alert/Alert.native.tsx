import { View, Text, type ViewProps, type TextProps } from "react-native";
import type { AlertVariant } from "./Alert.types";
import { cn } from "../../utils/cn";

interface AlertNativeProps extends ViewProps {
  variant?: AlertVariant;
  children?: React.ReactNode;
}

const variantClasses: Record<AlertVariant, { container: string; text: string }> = {
  default: {
    container: "bg-background border-border",
    text: "text-foreground",
  },
  destructive: {
    container: "bg-background border-destructive",
    text: "text-destructive",
  },
};

function Alert({ variant = "default", children, className, ...props }: AlertNativeProps) {
  const v = variantClasses[variant];

  return (
    <View
      accessibilityRole="alert"
      className={cn("w-full rounded-lg border px-4 py-3", v.container, className)}
      {...props}
    >
      {children}
    </View>
  );
}
Alert.displayName = "Alert";

interface AlertTitleNativeProps extends TextProps {
  children?: React.ReactNode;
}

function AlertTitle({ children, className, ...props }: AlertTitleNativeProps) {
  return (
    <Text
      className={cn("font-medium text-sm leading-none tracking-tight mb-1 text-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
AlertTitle.displayName = "AlertTitle";

interface AlertDescriptionNativeProps extends TextProps {
  children?: React.ReactNode;
}

function AlertDescription({
  children,
  className,
  ...props
}: AlertDescriptionNativeProps) {
  return typeof children === "string" ? (
    <Text
      className={cn("text-sm leading-5 text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  ) : (
    <View>{children}</View>
  );
}
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
export type { AlertNativeProps, AlertTitleNativeProps, AlertDescriptionNativeProps };
