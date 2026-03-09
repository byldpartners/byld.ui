import { createContext, useContext } from "react";
import { View, Text, type ViewProps, type TextProps } from "react-native";
import { cn } from "../../utils/cn";
import type {
  FormProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
} from "./Form.types";

interface FormFieldContextValue {
  name: string;
}

const FormFieldContext = createContext<FormFieldContextValue>({ name: "" });

interface FormNativeProps extends FormProps, ViewProps {
  className?: string;
}

function Form({ children, className, ...props }: FormNativeProps) {
  return (
    <View className={cn("gap-6", className)} {...props}>
      {children}
    </View>
  );
}

function FormField({ name, children }: FormFieldProps) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
}

interface FormItemNativeProps extends FormItemProps, ViewProps {
  className?: string;
}

function FormItem({ children, className, ...props }: FormItemNativeProps) {
  return (
    <View className={cn("gap-2", className)} {...props}>
      {children}
    </View>
  );
}

interface FormLabelNativeProps extends FormLabelProps, TextProps {
  className?: string;
}

function FormLabel({ children, className, ...props }: FormLabelNativeProps) {
  return (
    <Text className={cn("text-sm font-medium leading-[14px] text-foreground", className)} {...props}>
      {children}
    </Text>
  );
}

interface FormControlNativeProps extends FormControlProps, ViewProps {}

function FormControl({ children, ...props }: FormControlNativeProps) {
  return <View {...props}>{children}</View>;
}

interface FormDescriptionNativeProps extends FormDescriptionProps, TextProps {
  className?: string;
}

function FormDescription({ children, className, ...props }: FormDescriptionNativeProps) {
  return (
    <Text className={cn("text-xs text-muted-foreground", className)} {...props}>
      {children}
    </Text>
  );
}

interface FormMessageNativeProps extends FormMessageProps, TextProps {
  className?: string;
}

function FormMessage({ children, className, ...props }: FormMessageNativeProps) {
  if (!children) return null;

  return (
    <Text className={cn("text-xs font-medium text-destructive", className)} {...props}>
      {children}
    </Text>
  );
}

Form.displayName = "Form";
FormField.displayName = "FormField";
FormItem.displayName = "FormItem";
FormLabel.displayName = "FormLabel";
FormControl.displayName = "FormControl";
FormDescription.displayName = "FormDescription";
FormMessage.displayName = "FormMessage";

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};
export type { FormNativeProps };
