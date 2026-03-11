export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  className?: string;
}
