import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from "./ResizablePanel.types";

const ResizablePanelGroup = forwardRef<
  HTMLDivElement,
  ResizablePanelGroupProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, direction = "horizontal", children, ...props }, ref) => (
  <div
    ref={ref}
    data-panel-group=""
    data-panel-group-direction={direction}
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className,
    )}
    {...props}
  >
    {children}
  </div>
));
ResizablePanelGroup.displayName = "ResizablePanelGroup";

const ResizablePanel = forwardRef<
  HTMLDivElement,
  ResizablePanelProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, defaultSize, minSize, maxSize, children, style, ...props }, ref) => (
  <div
    ref={ref}
    data-panel=""
    className={cn("relative overflow-auto", className)}
    style={{
      flexGrow: defaultSize ?? 1,
      flexShrink: 1,
      flexBasis: 0,
      minWidth: minSize ? `${minSize}%` : undefined,
      maxWidth: maxSize ? `${maxSize}%` : undefined,
      overflow: "auto",
      resize: "both",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
));
ResizablePanel.displayName = "ResizablePanel";

const ResizableHandle = forwardRef<
  HTMLDivElement,
  ResizableHandleProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, withHandle, ...props }, ref) => (
  <div
    ref={ref}
    data-panel-resize-handle=""
    className={cn(
      "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
      className,
    )}
    {...props}
  >
    {withHandle && (
      <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="5" r="1" />
          <circle cx="12" cy="12" r="1" />
          <circle cx="12" cy="19" r="1" />
          <circle cx="19" cy="5" r="1" />
          <circle cx="19" cy="12" r="1" />
          <circle cx="19" cy="19" r="1" />
        </svg>
      </div>
    )}
  </div>
));
ResizableHandle.displayName = "ResizableHandle";

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
