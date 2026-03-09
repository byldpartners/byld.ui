export interface ScrollAreaProps {
  children?: React.ReactNode;
  className?: string;
}

export type ScrollBarOrientation = "vertical" | "horizontal";

export interface ScrollBarProps {
  orientation?: ScrollBarOrientation;
  className?: string;
}
