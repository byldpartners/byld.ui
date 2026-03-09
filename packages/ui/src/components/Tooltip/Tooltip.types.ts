import type { ReactNode } from "react";

export interface TooltipProps {
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

export interface TooltipTriggerProps {
  children?: ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface TooltipContentProps {
  children?: ReactNode;
  className?: string;
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
}

export interface TooltipProviderProps {
  children?: ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}
