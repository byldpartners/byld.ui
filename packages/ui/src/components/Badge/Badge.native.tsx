import { View, Text, type ViewProps } from "react-native";
import type { BadgeVariant } from "./Badge.types";
import { cn } from "../../utils/cn";

interface BadgeNativeProps extends ViewProps {
  variant?: BadgeVariant;
  children?: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, { container: string; text: string }> = {
  default: {
    container: "bg-primary border-transparent",
    text: "text-primary-foreground",
  },
  secondary: {
    container: "bg-secondary border-transparent",
    text: "text-secondary-foreground",
  },
  destructive: {
    container: "bg-destructive border-transparent",
    text: "text-destructive-foreground",
  },
  outline: {
    container: "bg-transparent border-border",
    text: "text-foreground",
  },
};

function Badge({
  variant = "default",
  children,
  className,
  ...props
}: BadgeNativeProps) {
  const v = variantClasses[variant];

  return (
    <View
      className={cn(
        "flex-row items-center rounded-md border px-2.5 py-0.5 self-start",
        v.container,
        className,
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("text-xs font-semibold", v.text)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

Badge.displayName = "Badge";

export { Badge };
export type { BadgeNativeProps };
