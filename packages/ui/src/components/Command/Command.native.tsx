import { View, Text, type ViewProps } from "react-native";
import type { CommandProps } from "./Command.types";

/**
 * Command is a web-only component (command palette).
 * This native file exports a placeholder View.
 * Use web-specific imports for the full command palette experience.
 */

interface CommandNativeProps extends CommandProps, ViewProps {}

function Command({ children, ...props }: CommandNativeProps) {
  return (
    <View
      className="p-4 rounded-lg bg-secondary items-center justify-center"
      {...props}
    >
      {children || (
        <Text className="text-sm text-muted-foreground">
          Command palette is available on web only.
        </Text>
      )}
    </View>
  );
}

Command.displayName = "Command";

export { Command };
export type { CommandNativeProps };
