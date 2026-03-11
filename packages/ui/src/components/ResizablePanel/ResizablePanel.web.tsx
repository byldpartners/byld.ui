import {
  Group,
  Panel,
  Separator,
} from "react-resizable-panels";
import { cn } from "../../utils/cn";
import type {
  ResizablePanelGroupProps,
  ResizablePanelProps,
  ResizableHandleProps,
} from "./ResizablePanel.types";

function ResizablePanelGroup({
  className,
  direction = "horizontal",
  children,
}: ResizablePanelGroupProps) {
  return (
    <Group
      orientation={direction}
      className={cn(
        "flex h-full w-full data-[orientation=vertical]:flex-col",
        className,
      )}
    >
      {children}
    </Group>
  );
}

function ResizablePanel({
  className,
  ...props
}: ResizablePanelProps & React.ComponentProps<typeof Panel>) {
  return <Panel className={cn("relative overflow-auto", className)} {...props} />;
}

function ResizableHandle({
  className,
  withHandle,
  ...props
}: ResizableHandleProps & React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:-translate-y-1/2 data-[orientation=vertical]:after:translate-x-0 [&[data-orientation=vertical]>div]:rotate-90",
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
    </Separator>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
