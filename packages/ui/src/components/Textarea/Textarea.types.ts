export interface TextareaProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  className?: string;
}
