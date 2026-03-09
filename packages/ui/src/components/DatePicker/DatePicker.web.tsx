import { forwardRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";
import { Calendar } from "../Calendar/Calendar.web";
import type { DatePickerProps } from "./DatePicker.types";

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const DatePicker = forwardRef<HTMLDivElement, DatePickerProps & React.HTMLAttributes<HTMLDivElement>>(
  (
    {
      value,
      onValueChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);

    const handleSelect = (date: Date | undefined) => {
      onValueChange?.(date);
      setOpen(false);
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild disabled={disabled}>
          <button
            type="button"
            className={cn(
              "flex h-9 w-full items-center justify-start whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              !value && "text-muted-foreground",
              className,
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-4 w-4"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            {value ? formatDate(value) : placeholder}
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            ref={ref}
            className="z-50 rounded-md border bg-popover p-0 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
            align="start"
            sideOffset={4}
            {...props}
          >
            <Calendar
              selected={value}
              onSelect={handleSelect}
            />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);
DatePicker.displayName = "DatePicker";

export { DatePicker };
