import type { ReactNode } from "react";

export interface PopoverProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface PopoverTriggerProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface PopoverContentProps {
  children?: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}
