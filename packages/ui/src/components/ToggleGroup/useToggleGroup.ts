import { useCallback, useMemo } from "react";
import { useControllableState } from "../../hooks/useControllableState";

interface UseToggleGroupProps {
  type?: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  disabled?: boolean;
}

interface UseToggleGroupReturn {
  type: "single" | "multiple";
  value: string[];
  disabled: boolean;
  onItemPress: (itemValue: string) => void;
}

function normalizeValue(v: string | string[] | undefined): string[] {
  if (v === undefined) return [];
  return Array.isArray(v) ? v : [v];
}

export function useToggleGroup({
  type = "single",
  value: controlledValue,
  defaultValue,
  onValueChange,
  disabled = false,
}: UseToggleGroupProps): UseToggleGroupReturn {
  const controlledNormalized = useMemo(
    () => (controlledValue !== undefined ? normalizeValue(controlledValue) : undefined),
    [controlledValue],
  );

  const [value, setValue] = useControllableState<string[]>({
    value: controlledNormalized,
    defaultValue: normalizeValue(defaultValue),
    onChange: (next) => {
      onValueChange?.(type === "single" ? (next[0] || "") : next);
    },
  });

  const onItemPress = useCallback(
    (itemValue: string) => {
      if (disabled) return;
      if (type === "single") {
        setValue(value.includes(itemValue) ? [] : [itemValue]);
      } else {
        setValue(
          value.includes(itemValue)
            ? value.filter((v) => v !== itemValue)
            : [...value, itemValue],
        );
      }
    },
    [disabled, type, value, setValue],
  );

  return { type, value, disabled, onItemPress };
}

export type { UseToggleGroupProps, UseToggleGroupReturn };
