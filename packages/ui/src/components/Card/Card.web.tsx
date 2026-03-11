import { forwardRef } from "react";
import { cn } from "../../utils/cn";
import type { CardProps } from "./Card.types";

const Card = forwardRef<HTMLDivElement, CardProps & React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card text-card-foreground shadow-sm",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
Card.displayName = "Card";

export { Card };
