import { View, type ViewProps } from "react-native";
import type { CardProps } from "./Card.types";

interface CardNativeProps extends CardProps, ViewProps {}

function Card({ children, ...props }: CardNativeProps) {
  return <View {...props}>{children}</View>;
}

Card.displayName = "Card";

export { Card };
export type { CardNativeProps };
