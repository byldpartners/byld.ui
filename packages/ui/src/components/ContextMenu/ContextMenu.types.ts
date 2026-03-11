import type { ReactNode } from "react";

export interface ContextMenuProps {
  children?: ReactNode;
}

export interface ContextMenuTriggerProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface ContextMenuContentProps {
  children?: ReactNode;
  className?: string;
}

export interface ContextMenuItemProps {
  children?: ReactNode;
  className?: string;
  inset?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface ContextMenuSeparatorProps {
  className?: string;
}

export interface ContextMenuLabelProps {
  children?: ReactNode;
  className?: string;
  inset?: boolean;
}

export interface ContextMenuCheckboxItemProps {
  children?: ReactNode;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface ContextMenuRadioGroupProps {
  children?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface ContextMenuRadioItemProps {
  children?: ReactNode;
  className?: string;
  value: string;
}

export interface ContextMenuSubProps {
  children?: ReactNode;
}

export interface ContextMenuSubTriggerProps {
  children?: ReactNode;
  className?: string;
  inset?: boolean;
}

export interface ContextMenuSubContentProps {
  children?: ReactNode;
  className?: string;
}
