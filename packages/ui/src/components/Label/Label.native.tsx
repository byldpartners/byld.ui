import { Text, type TextProps } from "react-native";
import type { LabelProps } from "./Label.types";
import { cn } from "../../utils/cn";

interface LabelNativeProps extends LabelProps, TextProps {
  className?: string;
}

function Label({ disabled = false, className, children, ...props }: LabelNativeProps) {
  return (
    <Text
      className={cn(
        "text-sm font-medium leading-[14px] text-foreground",
        disabled && "opacity-70",
        className,
      )}
      {...props}
    >
      {children}
    </Text>
  );
}

Label.displayName = "Label";

export { Label };
export type { LabelNativeProps };
