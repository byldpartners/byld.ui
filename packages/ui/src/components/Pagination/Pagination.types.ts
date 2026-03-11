export interface PaginationProps {
  children?: React.ReactNode;
  className?: string;
}

export interface PaginationContentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface PaginationItemProps {
  children?: React.ReactNode;
  className?: string;
}

export interface PaginationLinkProps {
  children?: React.ReactNode;
  className?: string;
  isActive?: boolean;
  size?: "default" | "icon";
  href?: string;
  onPress?: () => void;
}

export interface PaginationPreviousProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onPress?: () => void;
}

export interface PaginationNextProps {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  onPress?: () => void;
}

export interface PaginationEllipsisProps {
  className?: string;
}
