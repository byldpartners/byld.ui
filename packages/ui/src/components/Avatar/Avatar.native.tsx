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
import { useAvatarImage } from "./useAvatarImage";

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
  const { showImage, onLoad, onError, onLoadStart } = useAvatarImage({
    src,
    onLoadingStatusChange,
  });

  if (!showImage) return null;

  return (
    <Image
      source={{ uri: src }}
      accessibilityLabel={alt}
      onLoad={onLoad}
      onError={onError}
      onLoadStart={onLoadStart}
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
      className={cn("flex-1 items-center justify-center bg-muted rounded-full", className)}
      {...props}
    >
      {typeof children === "string" ? (
        <Text className="text-sm font-medium text-foreground">
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
