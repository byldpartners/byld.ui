export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  disabled?: boolean;
  className?: string;
}
