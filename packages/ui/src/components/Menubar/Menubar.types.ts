import type { ReactNode } from "react";

export interface MenubarProps {
  children?: ReactNode;
  className?: string;
}

export interface MenubarMenuProps {
  children?: ReactNode;
}

export interface MenubarTriggerProps {
  children?: ReactNode;
  className?: string;
}

export interface MenubarContentProps {
  children?: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  alignOffset?: number;
  sideOffset?: number;
}

export interface MenubarItemProps {
  children?: ReactNode;
  className?: string;
  inset?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface MenubarSeparatorProps {
  className?: string;
}

export interface MenubarSubProps {
  children?: ReactNode;
}

export interface MenubarSubTriggerProps {
  children?: ReactNode;
  className?: string;
  inset?: boolean;
}

export interface MenubarSubContentProps {
  children?: ReactNode;
  className?: string;
}

export interface MenubarCheckboxItemProps {
  children?: ReactNode;
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export interface MenubarRadioGroupProps {
  children?: ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export interface MenubarRadioItemProps {
  children?: ReactNode;
  className?: string;
  value: string;
}
