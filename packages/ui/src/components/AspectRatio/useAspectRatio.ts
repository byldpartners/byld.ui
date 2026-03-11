interface UseAspectRatioProps {
  ratio?: number;
  width?: number;
}

export function useAspectRatio({ ratio = 1, width = 0 }: UseAspectRatioProps = {}) {
  const safeRatio = ratio > 0 ? ratio : 1;
  const height = width > 0 ? width / safeRatio : 0;
  const isReady = width > 0;

  return { height, isReady, safeRatio };
}
