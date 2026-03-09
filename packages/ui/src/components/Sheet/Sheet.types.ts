import type { ReactNode } from "react";

export type SheetSide = "top" | "right" | "bottom" | "left";

export interface SheetProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface SheetTriggerProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface SheetContentProps {
  children?: ReactNode;
  className?: string;
  side?: SheetSide;
}

export interface SheetHeaderProps {
  children?: ReactNode;
  className?: string;
}

export interface SheetFooterProps {
  children?: ReactNode;
  className?: string;
}

export interface SheetTitleProps {
  children?: ReactNode;
  className?: string;
}

export interface SheetDescriptionProps {
  children?: ReactNode;
  className?: string;
}

export interface SheetCloseProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}
