import type { LucideIcon } from "lucide-react-native";
import { useResolveClassNames } from "uniwind";

interface IconProps {
  icon: LucideIcon;
  size?: number;
  strokeWidth?: number;
  className?: string;
}

function Icon({ icon: LucideComponent, size = 16, strokeWidth, className = "text-foreground" }: IconProps) {
  const style = useResolveClassNames(className);
  const color = (style as Record<string, unknown>).color as string | undefined;

  return (
    <LucideComponent
      size={size}
      color={color ?? "currentColor"}
      strokeWidth={strokeWidth}
    />
  );
}

Icon.displayName = "Icon";

export { Icon };
export type { IconProps };
