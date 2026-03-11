import { Pressable, Text, type PressableProps } from "react-native";
import { cva } from "class-variance-authority";
import type { ButtonVariant, ButtonSize, ButtonProps } from "./Button.types";
import { cn } from "../../utils/cn";
import { GLASS_TEXT_DEFAULT, type GlassProps } from "../../utils/glass.native";
import { GlassWrapper, useGlassActive } from "../../utils/withGlass.native";
import { useTheme, remToNumber } from "../../theme/native";

interface ButtonNativeProps extends ButtonProps, GlassProps, Omit<PressableProps, "children" | "disabled" | "onPress"> {}

const BUTTON_BASE = "flex-row items-center justify-center rounded-md gap-2";

const SIZE_CLASSES: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3",
  lg: "h-10 px-8",
  icon: "h-9 w-9",
};

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  default: "bg-primary shadow elevation-1",
  destructive: "bg-destructive shadow-sm elevation-1",
  outline: "bg-transparent border border-input shadow-sm elevation-1",
  secondary: "bg-secondary shadow-sm elevation-1",
  ghost: "bg-transparent",
  link: "bg-transparent",
};

const buttonContainerVariants = cva(BUTTON_BASE, {
  variants: {
    variant: VARIANT_CLASSES satisfies Record<ButtonVariant, string>,
    size: SIZE_CLASSES satisfies Record<ButtonSize, string>,
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

const buttonTextVariants = cva("font-medium leading-tight", {
  variants: {
    variant: {
      default: "text-primary-foreground",
      destructive: "text-destructive-foreground",
      outline: "text-foreground",
      secondary: "text-secondary-foreground",
      ghost: "text-foreground",
      link: "text-foreground underline",
    } satisfies Record<ButtonVariant, string>,
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-sm",
      icon: "text-sm",
    } satisfies Record<ButtonSize, string>,
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function ButtonContent({
  variant = "default",
  size = "default",
  disabled,
  children,
  onPress,
  className,
  glassTextColor = GLASS_TEXT_DEFAULT,
  ...props
}: Omit<ButtonNativeProps, "glass" | "glassEffect">) {
  const glassActive = useGlassActive();

  const containerClassName = glassActive
    ? cn(BUTTON_BASE, SIZE_CLASSES[size], disabled && "opacity-50", className)
    : cn(buttonContainerVariants({ variant, size }), disabled && "opacity-50", className);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={containerClassName}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className={cn(
          buttonTextVariants({ size }),
          glassActive ? glassTextColor : buttonTextVariants({ variant }),
        )}>
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

function Button({
  glass,
  glassEffect,
  glassTextColor,
  ...props
}: ButtonNativeProps) {
  const { tokens, glass: themeGlass } = useTheme();

  return (
    <GlassWrapper enabled={glass ?? themeGlass} effect={glassEffect} style={{ borderRadius: remToNumber(tokens.radius.md) }}>
      <ButtonContent glassTextColor={glassTextColor} {...props} />
    </GlassWrapper>
  );
}

Button.displayName = "Button";

export { Button, buttonContainerVariants, buttonTextVariants };
export type { ButtonNativeProps };
