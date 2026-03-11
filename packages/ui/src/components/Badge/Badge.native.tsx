import { View, Text, type ViewProps } from "react-native";
import { cva } from "class-variance-authority";
import type { BadgeVariant, BadgeProps } from "./Badge.types";
import { cn } from "../../utils/cn";

interface BadgeNativeProps extends BadgeProps, ViewProps {}

const badgeContainerVariants = cva(
  "flex-row items-center rounded-md border px-2.5 py-0.5 self-start",
  {
    variants: {
      variant: {
        default: "bg-primary border-transparent shadow elevation-1",
        secondary: "bg-secondary border-transparent",
        destructive: "bg-destructive border-transparent shadow elevation-1",
        outline: "bg-transparent border-border",
      } satisfies Record<BadgeVariant, string>,
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const badgeTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      secondary: "text-secondary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
    } satisfies Record<BadgeVariant, string>,
  },
  defaultVariants: {
    variant: "default",
  },
});

function Badge({
  variant = "default",
  children,
  className,
  ...props
}: BadgeNativeProps) {
  return (
    <View
      className={cn(badgeContainerVariants({ variant }), className)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn(badgeTextVariants({ variant }))}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}

Badge.displayName = "Badge";

export { Badge, badgeContainerVariants, badgeTextVariants };
export type { BadgeNativeProps };
