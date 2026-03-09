export interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface AlertDialogTriggerProps {
  children?: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

export interface AlertDialogContentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AlertDialogHeaderProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AlertDialogFooterProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AlertDialogTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AlertDialogDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AlertDialogActionProps {
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export interface AlertDialogCancelProps {
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
}
