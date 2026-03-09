export interface BreadcrumbProps {
  separator?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export interface BreadcrumbListProps {
  children?: React.ReactNode;
  className?: string;
}

export interface BreadcrumbItemProps {
  children?: React.ReactNode;
  className?: string;
}

export interface BreadcrumbLinkProps {
  href?: string;
  asChild?: boolean;
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export interface BreadcrumbPageProps {
  children?: React.ReactNode;
  className?: string;
}

export interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
  className?: string;
}

export interface BreadcrumbEllipsisProps {
  className?: string;
}
