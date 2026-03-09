import { View, Text, type ViewProps } from "react-native";
import type { ChartConfig } from "./Chart.types";

interface ChartNativeProps extends ViewProps {
  config: ChartConfig;
  children?: React.ReactNode;
}

function Chart({ ...props }: ChartNativeProps) {
  return (
    <View
      className="items-center justify-center p-4 rounded-lg bg-secondary min-h-[200px]"
      {...props}
    >
      <Text className="text-muted-foreground text-sm">
        Charts are not supported on native
      </Text>
    </View>
  );
}
Chart.displayName = "Chart";

export { Chart };
export type { ChartNativeProps };
