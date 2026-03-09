import { View, type ViewProps } from "react-native";
import type {
  HoverCardProps,
  HoverCardTriggerProps,
  HoverCardContentProps,
} from "./HoverCard.types";

interface HoverCardNativeProps extends HoverCardProps, ViewProps {}

/**
 * HoverCard on native is a passthrough — hover interactions
 * are not meaningful on mobile devices.
 */
function HoverCard({ children, ...props }: HoverCardNativeProps) {
  return <View {...props}>{children}</View>;
}
HoverCard.displayName = "HoverCard";

interface HoverCardTriggerNativeProps extends HoverCardTriggerProps, ViewProps {}

function HoverCardTrigger({
  children,
  ...props
}: HoverCardTriggerNativeProps) {
  return <View {...props}>{children}</View>;
}
HoverCardTrigger.displayName = "HoverCardTrigger";

interface HoverCardContentNativeProps extends HoverCardContentProps, ViewProps {}

/**
 * HoverCardContent is not rendered on native since hover
 * is not a meaningful interaction on mobile.
 */
function HoverCardContent(_props: HoverCardContentNativeProps) {
  return null;
}
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
export type {
  HoverCardNativeProps,
  HoverCardTriggerNativeProps,
  HoverCardContentNativeProps,
};
