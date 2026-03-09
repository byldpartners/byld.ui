import { Pressable, Text, type PressableProps } from "react-native";
import type { ButtonVariant, ButtonSize } from "./Button.types";
import { cn } from "../../utils/cn";

interface ButtonNativeProps extends Omit<PressableProps, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children?: React.ReactNode;
  onPress?: () => void;
}

const variantClasses: Record<ButtonVariant, { container: string; text: string }> = {
  default: { container: "bg-primary", text: "text-primary-foreground" },
  destructive: { container: "bg-destructive", text: "text-destructive-foreground" },
  outline: { container: "bg-transparent border border-input", text: "text-foreground" },
  secondary: { container: "bg-secondary", text: "text-secondary-foreground" },
  ghost: { container: "bg-transparent", text: "text-foreground" },
  link: { container: "bg-transparent", text: "text-foreground underline" },
};

const sizeClasses: Record<ButtonSize, { container: string; text: string }> = {
  default: { container: "h-9 px-4", text: "text-sm" },
  sm: { container: "h-8 px-3", text: "text-xs" },
  lg: { container: "h-10 px-8", text: "text-sm" },
  icon: { container: "h-9 w-9", text: "text-sm" },
};

function Button({
  variant = "default",
  size = "default",
  disabled,
  children,
  onPress,
  className,
  ...props
}: ButtonNativeProps) {
  const v = variantClasses[variant];
  const s = sizeClasses[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={cn(
        "flex-row items-center justify-center rounded-md gap-2",
        v.container,
        s.container,
        disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn("font-medium", v.text, s.text)}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

Button.displayName = "Button";

export { Button };
export type { ButtonNativeProps };
