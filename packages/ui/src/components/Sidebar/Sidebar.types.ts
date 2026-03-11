import type { ReactNode } from "react";

export interface SidebarProps {
  children?: ReactNode;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  collapsible?: "offcanvas" | "icon" | "none";
  side?: "left" | "right";
}

export interface SidebarHeaderProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarContentProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarFooterProps {
  children?: ReactNode;
  className?: string;
}

export interface SidebarTriggerProps {
  children?: ReactNode;
  className?: string;
}
