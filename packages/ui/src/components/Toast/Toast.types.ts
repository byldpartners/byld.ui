import type { ReactNode } from "react";

export type ToastVariant = "default" | "destructive";

export interface ToastProps {
  children?: ReactNode;
  className?: string;
  variant?: ToastVariant;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface ToastProviderProps {
  children?: ReactNode;
}

export interface ToastViewportProps {
  className?: string;
}

export interface ToastTitleProps {
  children?: ReactNode;
  className?: string;
}

export interface ToastDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export interface ToastActionProps {
  children?: ReactNode;
  className?: string;
  altText: string;
  onClick?: () => void;
}

export interface ToastCloseProps {
  className?: string;
}

export interface ToasterToast {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  variant?: ToastVariant;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
