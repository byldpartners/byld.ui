import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from "react-native";
import { defaultPreset } from "../../theme/presets/default";
import type { SwitchProps } from "./Switch.types";

type SwitchNativeProps = SwitchProps & Omit<RNSwitchProps, "value" | "onValueChange" | "className">;

const colors = defaultPreset.tokens.colors;

function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  ...props
}: SwitchNativeProps) {
  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{ false: colors.input, true: colors.primary }}
      thumbColor={colors.background}
      {...props}
    />
  );
}

Switch.displayName = "Switch";

export { Switch };
export type { SwitchNativeProps };
