export interface AvatarProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AvatarImageProps {
  src?: string;
  alt?: string;
  className?: string;
  onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void;
}

export interface AvatarFallbackProps {
  children?: React.ReactNode;
  className?: string;
  delayMs?: number;
}
