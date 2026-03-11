import { View, Text, type ViewProps, type TextProps } from "react-native";
import { cva } from "class-variance-authority";
import type { AlertVariant, AlertProps, AlertTitleProps, AlertDescriptionProps } from "./Alert.types";
import { cn } from "../../utils/cn";
import { AlertContext, useAlertContext } from "./useAlert";

interface AlertNativeProps extends AlertProps, ViewProps {}

const alertVariants = cva(
  "w-full rounded-lg border px-4 py-3 text-sm",
  {
    variants: {
      variant: {
        default: "bg-background border-border",
        destructive: "bg-background border-destructive/50",
      } satisfies Record<AlertVariant, string>,
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({ variant = "default", children, className, ...props }: AlertNativeProps) {
  return (
    <AlertContext.Provider value={variant}>
      <View
        accessibilityRole="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {children}
      </View>
    </AlertContext.Provider>
  );
}
Alert.displayName = "Alert";

interface AlertTitleNativeProps extends AlertTitleProps, TextProps {}

function AlertTitle({ children, className, ...props }: AlertTitleNativeProps) {
  const variant = useAlertContext();

  return (
    <Text
      className={cn(
        "font-medium leading-none tracking-tight mb-1",
        variant === "destructive" ? "text-destructive" : "text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Text>
  );
}
AlertTitle.displayName = "AlertTitle";

interface AlertDescriptionNativeProps extends AlertDescriptionProps, TextProps {}

function AlertDescription({
  children,
  className,
  ...props
}: AlertDescriptionNativeProps) {
  const variant = useAlertContext();

  return typeof children === "string" ? (
    <Text
      className={cn(
        "text-sm leading-relaxed",
        variant === "destructive" ? "text-destructive" : "text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </Text>
  ) : (
    <View>{children}</View>
  );
}
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription, alertVariants };
export type { AlertNativeProps, AlertTitleNativeProps, AlertDescriptionNativeProps };
