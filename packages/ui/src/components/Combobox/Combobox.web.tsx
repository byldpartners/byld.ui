import { forwardRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "../../utils/cn";
import type { ComboboxProps } from "./Combobox.types";

const Combobox = forwardRef<HTMLDivElement, ComboboxProps & React.HTMLAttributes<HTMLDivElement>>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select...",
      searchPlaceholder = "Search...",
      emptyMessage = "No results found.",
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const selectedOption = options.find((o) => o.value === value);
    const filtered = options.filter((o) =>
      o.label.toLowerCase().includes(search.toLowerCase()),
    );

    const handleSelect = (val: string) => {
      onValueChange?.(val === value ? "" : val);
      setOpen(false);
      setSearch("");
    };

    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild disabled={disabled}>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
          >
            <span className={cn(!selectedOption && "text-muted-foreground")}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
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
              className="ml-2 h-4 w-4 shrink-0 opacity-50"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            ref={ref}
            className="z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
            align="start"
            sideOffset={4}
            onCloseAutoFocus={(e) => e.preventDefault()}
            {...props}
          >
            <div className="flex items-center border-b px-3">
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
                className="mr-2 h-4 w-4 shrink-0 opacity-50"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                className="flex h-9 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="max-h-[300px] overflow-y-auto p-1">
              {filtered.length === 0 ? (
                <div className="py-6 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </div>
              ) : (
                filtered.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleSelect(option.value)}
                    className={cn(
                      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                      value === option.value && "bg-accent",
                    )}
                  >
                    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                      {value === option.value && (
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
                          className="h-4 w-4"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    {option.label}
                  </button>
                ))
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  },
);
Combobox.displayName = "Combobox";

export { Combobox };
