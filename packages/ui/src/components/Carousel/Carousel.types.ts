export type CarouselOrientation = "horizontal" | "vertical";

export interface CarouselProps {
  orientation?: CarouselOrientation;
  children?: React.ReactNode;
  className?: string;
}

export interface CarouselContentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CarouselItemProps {
  children?: React.ReactNode;
  className?: string;
}

export interface CarouselPreviousProps {
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
}

export interface CarouselNextProps {
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
}
