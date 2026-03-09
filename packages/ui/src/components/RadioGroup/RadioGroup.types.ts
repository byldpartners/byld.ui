export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface RadioGroupItemProps {
  value: string;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  id?: string;
}
