/**
 * Command is a web-heavy component (command palette / cmdk-style).
 * The native implementation is a placeholder — this component is primarily designed for web.
 */

export interface CommandProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

export interface CommandListProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CommandEmptyProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CommandGroupProps {
  heading?: string;
  children?: React.ReactNode;
  className?: string;
}

export interface CommandItemProps {
  children?: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface CommandSeparatorProps {
  className?: string;
}
