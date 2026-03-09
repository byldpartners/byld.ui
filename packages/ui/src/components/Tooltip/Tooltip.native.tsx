import type {
  TooltipProps,
  TooltipTriggerProps,
  TooltipContentProps,
  TooltipProviderProps,
} from "./Tooltip.types";

/**
 * Tooltip - Native passthrough
 *
 * Tooltips aren't meaningful on mobile (no hover state).
 * These components simply pass through children so imports don't break.
 */

function TooltipProvider({ children }: TooltipProviderProps) {
  return <>{children}</>;
}
TooltipProvider.displayName = "TooltipProvider";

function Tooltip({ children }: TooltipProps) {
  return <>{children}</>;
}
Tooltip.displayName = "Tooltip";

function TooltipTrigger({ children }: TooltipTriggerProps) {
  return <>{children}</>;
}
TooltipTrigger.displayName = "TooltipTrigger";

function TooltipContent({ children }: TooltipContentProps) {
  // Tooltip content is not rendered on native
  return null;
}
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
