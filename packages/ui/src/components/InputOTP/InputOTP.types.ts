export interface InputOTPProps {
  length?: number;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export interface InputOTPSlotProps {
  index: number;
  char?: string;
  isActive?: boolean;
  className?: string;
}
