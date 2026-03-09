import type { ToggleVariant, ToggleSize } from "../Toggle/Toggle.types";

export interface ToggleGroupProps {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface ToggleGroupItemProps {
  value: string;
  variant?: ToggleVariant;
  size?: ToggleSize;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}
