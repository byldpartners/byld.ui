import {
  forwardRef,
  createContext,
  useContext,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { useSidebar as useSidebarHook } from "./useSidebar";

/**
 * Sidebar - Web implementation
 *
 * Note: This is a web-heavy component. Sidebars on mobile are typically
 * handled by navigation libraries (e.g., React Navigation drawer).
 */

interface SidebarContextValue {
  open: boolean;
  setOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue>({
  open: true,
  setOpen: () => {},
  toggleSidebar: () => {},
});

export function useSidebarContext() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider.");
  }
  return context;
}

interface SidebarProviderProps {
  children?: ReactNode;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const SidebarProvider = forwardRef<
  HTMLDivElement,
  SidebarProviderProps & React.HTMLAttributes<HTMLDivElement>
>(({ defaultOpen = true, open: controlledOpen, onOpenChange, className, children, ...props }, ref) => {
  const { open, setOpen, toggleSidebar } = useSidebarHook({
    open: controlledOpen,
    defaultOpen,
    onOpenChange,
  });

  return (
    <SidebarContext.Provider value={{ open, setOpen, toggleSidebar }}>
      <div
        ref={ref}
        className={cn("flex min-h-svh w-full", className)}
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
});
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    side?: "left" | "right";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(({ side = "left", collapsible = "offcanvas", className, children, ...props }, ref) => {
  const { open } = useSidebarContext();

  if (collapsible === "none") {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        "group/sidebar relative flex flex-col bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear",
        open ? "w-[--sidebar-width]" : collapsible === "icon" ? "w-[--sidebar-width-icon]" : "w-0",
        side === "right" && "order-last",
        className,
      )}
      data-state={open ? "expanded" : "collapsed"}
      data-side={side}
      {...props}
    >
      <div
        className={cn(
          "flex h-full w-[--sidebar-width] flex-col overflow-hidden",
          !open && collapsible === "offcanvas" && "invisible",
        )}
      >
        {children}
      </div>
    </div>
  );
});
Sidebar.displayName = "Sidebar";

const SidebarHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-2",
      className,
    )}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebarContext();
  return (
    <button
      ref={ref}
      className={cn("h-7 w-7", className)}
      onClick={(e) => {
        onClick?.(e);
        toggleSidebar();
      }}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M9 3v18" />
      </svg>
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

export {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
};
