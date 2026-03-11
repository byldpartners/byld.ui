import { Switch as RNSwitch, type SwitchProps as RNSwitchProps } from "react-native";
import { useCSSVariable } from "uniwind";
import type { SwitchProps } from "./Switch.types";

type SwitchNativeProps = SwitchProps & Omit<RNSwitchProps, "value" | "onValueChange" | "className">;

function Switch({
  checked,
  defaultChecked,
  onCheckedChange,
  disabled = false,
  className: _className,
  ...props
}: SwitchNativeProps) {
  const [input, primary, background] = useCSSVariable([
    "--color-input",
    "--color-primary",
    "--color-background",
  ]) as [string, string, string];

  return (
    <RNSwitch
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{ false: input, true: primary }}
      thumbColor={background}
      {...props}
    />
  );
}

Switch.displayName = "Switch";

export { Switch };
export type { SwitchNativeProps };
