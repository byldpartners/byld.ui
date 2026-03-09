import { useState } from "react";
import {
  Image,
  Text,
  View,
  type ViewProps,
  type ImageProps,
} from "react-native";
import { cn } from "../../utils/cn";
import type {
  AvatarProps,
  AvatarImageProps,
  AvatarFallbackProps,
} from "./Avatar.types";

// --- Avatar ---

interface AvatarNativeProps extends AvatarProps, ViewProps {}

function Avatar({ children, className, ...props }: AvatarNativeProps) {
  return (
    <View
      className={cn("relative h-10 w-10 rounded-full overflow-hidden", className)}
      {...props}
    >
      {children}
    </View>
  );
}
Avatar.displayName = "Avatar";

// --- AvatarImage ---

interface AvatarImageNativeProps extends AvatarImageProps, Omit<ImageProps, "source"> {}

function AvatarImage({
  src,
  alt,
  className,
  onLoadingStatusChange,
  ...props
}: AvatarImageNativeProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) return null;

  return (
    <Image
      source={{ uri: src }}
      accessibilityLabel={alt}
      onLoad={() => onLoadingStatusChange?.("loaded")}
      onError={() => {
        setHasError(true);
        onLoadingStatusChange?.("error");
      }}
      onLoadStart={() => onLoadingStatusChange?.("loading")}
      className={cn("h-full w-full", className)}
      {...props}
    />
  );
}
AvatarImage.displayName = "AvatarImage";

// --- AvatarFallback ---

interface AvatarFallbackNativeProps extends AvatarFallbackProps, ViewProps {}

function AvatarFallback({
  children,
  className,
  ...props
}: AvatarFallbackNativeProps) {
  return (
    <View
      className={cn("flex-1 items-center justify-center bg-secondary rounded-full", className)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium text-muted-foreground">
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  );
}
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
export type {
  AvatarNativeProps,
  AvatarImageNativeProps,
  AvatarFallbackNativeProps,
};
