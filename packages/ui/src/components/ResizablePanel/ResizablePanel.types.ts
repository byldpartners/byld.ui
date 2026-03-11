export type ResizableDirection = "horizontal" | "vertical";

export interface ResizablePanelGroupProps {
  direction?: ResizableDirection;
  children?: React.ReactNode;
  className?: string;
}

export interface ResizablePanelProps {
  defaultSize?: number;
  minSize?: number;
  maxSize?: number;
  children?: React.ReactNode;
  className?: string;
}

export interface ResizableHandleProps {
  withHandle?: boolean;
  className?: string;
}
