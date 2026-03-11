import type { ReactNode } from "react";

export interface DropdownMenuProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DropdownMenuTriggerProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface DropdownMenuContentProps {
  children?: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export interface DropdownMenuItemProps {
  children?: ReactNode;
  className?: string;
  inset?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface DropdownMenuSeparatorProps {
  className?: string;
}

export interface DropdownMenuLabelProps {
  children?: ReactNode;
  className?: string;
  inset?: boolean;
}

export interface DropdownMenuCheckboxItemProps {
  children?: ReactNode;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface DropdownMenuRadioGroupProps {
  children?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface DropdownMenuRadioItemProps {
  children?: ReactNode;
  className?: string;
  value: string;
}

export interface DropdownMenuSubProps {
  children?: ReactNode;
}

export interface DropdownMenuSubTriggerProps {
  children?: ReactNode;
  className?: string;
  inset?: boolean;
}

export interface DropdownMenuSubContentProps {
  children?: ReactNode;
  className?: string;
}
