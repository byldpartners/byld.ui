export type AlertVariant = "default" | "destructive";

export interface AlertProps {
  variant?: AlertVariant;
  children?: React.ReactNode;
  className?: string;
}

export interface AlertTitleProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AlertDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}
