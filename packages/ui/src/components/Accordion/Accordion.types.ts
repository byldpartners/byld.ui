export type AccordionType = "single" | "multiple";

export interface AccordionProps {
  type?: AccordionType;
  collapsible?: boolean;
  defaultValue?: string | string[];
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  children?: React.ReactNode;
  className?: string;
}

export interface AccordionItemProps {
  value: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export interface AccordionTriggerProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AccordionContentProps {
  children?: React.ReactNode;
  className?: string;
}
