import type { ReactNode } from "react";

export interface DialogProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface DialogTriggerProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface DialogContentProps {
  children?: ReactNode;
  className?: string;
  onClose?: () => void;
}

export interface DialogHeaderProps {
  children?: ReactNode;
  className?: string;
}

export interface DialogFooterProps {
  children?: ReactNode;
  className?: string;
}

export interface DialogTitleProps {
  children?: ReactNode;
  className?: string;
}

export interface DialogDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export interface DialogCloseProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}
