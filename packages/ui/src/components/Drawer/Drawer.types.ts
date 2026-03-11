import type { ReactNode } from "react";

export interface DrawerProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DrawerTriggerProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface DrawerContentProps {
  children?: ReactNode;
  className?: string;
}

export interface DrawerHeaderProps {
  children?: ReactNode;
  className?: string;
}

export interface DrawerFooterProps {
  children?: ReactNode;
  className?: string;
}

export interface DrawerTitleProps {
  children?: ReactNode;
  className?: string;
}

export interface DrawerDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export interface DrawerCloseProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}
