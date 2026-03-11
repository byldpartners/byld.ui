import { useControllableState } from "../../hooks/useControllableState";

interface UseTabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function useTabs({ value, defaultValue = "", onValueChange }: UseTabsProps) {
  const [currentValue, setCurrentValue] = useControllableState<string>({
    value,
    defaultValue,
    onChange: onValueChange,
  });

  return {
    value: currentValue,
    onValueChange: setCurrentValue,
  };
}
