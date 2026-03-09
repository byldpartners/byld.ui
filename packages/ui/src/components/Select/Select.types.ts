export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface SelectItemOption {
  label: string;
  value: string;
}
