export type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

export interface BadgeProps {
  variant?: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}
