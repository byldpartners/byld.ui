export type ToggleVariant = "default" | "outline";
export type ToggleSize = "default" | "sm" | "lg";

export interface ToggleProps {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}
