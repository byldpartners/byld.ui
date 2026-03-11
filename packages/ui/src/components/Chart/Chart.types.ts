export interface ChartConfig {
  [key: string]: {
    label?: string;
    color?: string;
    icon?: React.ComponentType;
  };
}

export interface ChartProps {
  config: ChartConfig;
  children?: React.ReactNode;
  className?: string;
}
