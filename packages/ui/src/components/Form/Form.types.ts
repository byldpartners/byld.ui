export interface FormProps {
  children?: React.ReactNode;
  className?: string;
  onSubmit?: () => void;
}

export interface FormFieldProps {
  name: string;
  children?: React.ReactNode;
}

export interface FormItemProps {
  children?: React.ReactNode;
  className?: string;
}

export interface FormLabelProps {
  children?: React.ReactNode;
  className?: string;
}

export interface FormControlProps {
  children?: React.ReactNode;
  className?: string;
}

export interface FormDescriptionProps {
  children?: React.ReactNode;
  className?: string;
}

export interface FormMessageProps {
  children?: React.ReactNode;
  className?: string;
}
