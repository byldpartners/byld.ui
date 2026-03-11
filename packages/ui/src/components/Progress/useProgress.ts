interface UseProgressProps {
  value?: number;
  max?: number;
}

export function useProgress({ value = 0, max = 100 }: UseProgressProps = {}) {
  const clampedValue = Math.min(Math.max(value, 0), max);
  const percentage = max > 0 ? clampedValue / max : 0;

  return { clampedValue, percentage, max };
}
