export interface CollapsibleProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export interface CollapsibleTriggerProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface CollapsibleContentProps {
  children?: React.ReactNode;
  className?: string;
}
