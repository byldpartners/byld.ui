import { useState, useCallback, useMemo } from "react";

interface UseComboboxProps<T> {
  items: T[];
  value?: string;
  onValueChange?: (value: string) => void;
  filterFn?: (item: T, search: string) => boolean;
}

export function useCombobox<T>({
  items,
  value,
  onValueChange,
  filterFn,
}: UseComboboxProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredItems = useMemo(() => {
    if (!search || !filterFn) return items;
    return items.filter((item) => filterFn(item, search));
  }, [items, search, filterFn]);

  const handleValueChange = useCallback(
    (val: string) => {
      onValueChange?.(val === value ? "" : val);
      setOpen(false);
      setSearch("");
    },
    [value, onValueChange],
  );

  return {
    value,
    onValueChange: handleValueChange,
    open,
    setOpen,
    search,
    setSearch,
    filteredItems,
  };
}
