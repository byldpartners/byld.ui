import { forwardRef, useMemo } from "react";
import { cn } from "../../utils/cn";
import type { ChartConfig, ChartProps } from "./Chart.types";

const Chart = forwardRef<
  HTMLDivElement,
  ChartProps & React.HTMLAttributes<HTMLDivElement>
>(({ className, config, children, ...props }, ref) => {
  const cssVars = useMemo(() => {
    const vars: Record<string, string> = {};
    Object.entries(config).forEach(([key, value]) => {
      if (value.color) {
        vars[`--color-${key}`] = value.color;
      }
    });
    return vars;
  }, [config]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className,
      )}
      style={cssVars as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
});
Chart.displayName = "Chart";

export { Chart };
export type { ChartConfig };
