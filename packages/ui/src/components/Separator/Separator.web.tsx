import { forwardRef } from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cva } from "class-variance-authority";
import type { SeparatorOrientation } from "./Separator.types";
import { cn } from "../../utils/cn";

const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-[1px] w-full",
      vertical: "h-full w-[1px]",
    } satisfies Record<SeparatorOrientation, string>,
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

const Separator = forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator, separatorVariants };
