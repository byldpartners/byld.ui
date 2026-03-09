import type {
  ContextMenuProps,
  ContextMenuTriggerProps,
  ContextMenuContentProps,
  ContextMenuItemProps,
  ContextMenuSeparatorProps,
  ContextMenuLabelProps,
  ContextMenuCheckboxItemProps,
  ContextMenuRadioGroupProps,
  ContextMenuRadioItemProps,
  ContextMenuSubProps,
  ContextMenuSubTriggerProps,
  ContextMenuSubContentProps,
} from "./ContextMenu.types";

/**
 * ContextMenu - Native placeholder
 *
 * Context menus (right-click menus) don't have a native equivalent on mobile.
 * This implementation passes through trigger children directly.
 */

function ContextMenu({ children }: ContextMenuProps) {
  return <>{children}</>;
}
ContextMenu.displayName = "ContextMenu";

function ContextMenuTrigger({ children }: ContextMenuTriggerProps) {
  return <>{children}</>;
}
ContextMenuTrigger.displayName = "ContextMenuTrigger";

function ContextMenuContent(_props: ContextMenuContentProps) {
  // Content is not rendered on native - context menus don't exist on mobile
  return null;
}
ContextMenuContent.displayName = "ContextMenuContent";

function ContextMenuItem(_props: ContextMenuItemProps) {
  return null;
}
ContextMenuItem.displayName = "ContextMenuItem";

function ContextMenuSeparator(_props: ContextMenuSeparatorProps) {
  return null;
}
ContextMenuSeparator.displayName = "ContextMenuSeparator";

function ContextMenuLabel(_props: ContextMenuLabelProps) {
  return null;
}
ContextMenuLabel.displayName = "ContextMenuLabel";

function ContextMenuCheckboxItem(_props: ContextMenuCheckboxItemProps) {
  return null;
}
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem";

function ContextMenuRadioGroup(_props: ContextMenuRadioGroupProps) {
  return null;
}
ContextMenuRadioGroup.displayName = "ContextMenuRadioGroup";

function ContextMenuRadioItem(_props: ContextMenuRadioItemProps) {
  return null;
}
ContextMenuRadioItem.displayName = "ContextMenuRadioItem";

function ContextMenuSub(_props: ContextMenuSubProps) {
  return null;
}
ContextMenuSub.displayName = "ContextMenuSub";

function ContextMenuSubTrigger(_props: ContextMenuSubTriggerProps) {
  return null;
}
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger";

function ContextMenuSubContent(_props: ContextMenuSubContentProps) {
  return null;
}
ContextMenuSubContent.displayName = "ContextMenuSubContent";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
