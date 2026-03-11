export interface HoverCardProps {
  openDelay?: number;
  closeDelay?: number;
  children?: React.ReactNode;
}

export interface HoverCardTriggerProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface HoverCardContentProps {
  children?: React.ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}
