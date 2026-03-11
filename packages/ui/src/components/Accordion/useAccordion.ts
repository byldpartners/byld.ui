import { useState, useCallback } from "react";
import type { AccordionType } from "./Accordion.types";

interface UseAccordionProps {
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
}

export function useAccordion({
  type = "single",
  collapsible = false,
  defaultValue,
  value: controlledValue,
  onValueChange,
}: UseAccordionProps) {
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    if (defaultValue) {
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    }
    return [];
  });

  const expandedItems =
    controlledValue !== undefined
      ? Array.isArray(controlledValue)
        ? controlledValue
        : [controlledValue]
      : internalValue;

  const toggle = useCallback(
    (itemValue: string) => {
      let next: string[];

      if (type === "single") {
        if (expandedItems.includes(itemValue)) {
          next = collapsible ? [] : expandedItems;
        } else {
          next = [itemValue];
        }
      } else {
        if (expandedItems.includes(itemValue)) {
          next = expandedItems.filter((v) => v !== itemValue);
        } else {
          next = [...expandedItems, itemValue];
        }
      }

      if (controlledValue === undefined) {
        setInternalValue(next);
      }
      onValueChange?.(type === "single" ? (next[0] ?? "") : next);

      return next;
    },
    [type, collapsible, expandedItems, controlledValue, onValueChange],
  );

  return {
    expandedItems,
    toggle,
  };
}
