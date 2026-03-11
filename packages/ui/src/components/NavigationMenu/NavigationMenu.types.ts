import type { ReactNode } from "react";

export interface NavigationMenuProps {
  children?: ReactNode;
  className?: string;
}

export interface NavigationMenuListProps {
  children?: ReactNode;
  className?: string;
}

export interface NavigationMenuItemProps {
  children?: ReactNode;
  className?: string;
  value?: string;
}

export interface NavigationMenuTriggerProps {
  children?: ReactNode;
  className?: string;
}

export interface NavigationMenuContentProps {
  children?: ReactNode;
  className?: string;
}

export interface NavigationMenuLinkProps {
  children?: ReactNode;
  className?: string;
  href?: string;
  active?: boolean;
  onPress?: () => void;
}
