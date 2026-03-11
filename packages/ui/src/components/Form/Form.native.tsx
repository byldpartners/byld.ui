import { View, Text, type ViewProps, type TextProps } from "react-native";
import { cn } from "../../utils/cn";
import { FormFieldContext, useFormFieldId } from "./useFormField";
import type {
  FormProps,
  FormFieldProps,
  FormItemProps,
  FormLabelProps,
  FormControlProps,
  FormDescriptionProps,
  FormMessageProps,
} from "./Form.types";

interface FormNativeProps extends FormProps, ViewProps {}

function Form({ children, className, ...props }: FormNativeProps) {
  return (
    <View className={cn("gap-6", className)} {...props}>
      {children}
    </View>
  );
}

function FormField({ name, children }: FormFieldProps) {
  const id = useFormFieldId();
  return (
    <FormFieldContext.Provider value={{ id, name }}>
      {children}
    </FormFieldContext.Provider>
  );
}

interface FormItemNativeProps extends FormItemProps, ViewProps {}

function FormItem({ children, className, ...props }: FormItemNativeProps) {
  return (
    <View className={cn("gap-2", className)} {...props}>
      {children}
    </View>
  );
}

interface FormLabelNativeProps extends FormLabelProps, TextProps {}

function FormLabel({ children, className, ...props }: FormLabelNativeProps) {
  return (
    <Text className={cn("text-sm font-medium leading-none text-foreground", className)} {...props}>
      {children}
    </Text>
  );
}

interface FormControlNativeProps extends FormControlProps, ViewProps {}

function FormControl({ children, ...props }: FormControlNativeProps) {
  return <View {...props}>{children}</View>;
}

interface FormDescriptionNativeProps extends FormDescriptionProps, TextProps {}

function FormDescription({ children, className, ...props }: FormDescriptionNativeProps) {
  return (
    <Text className={cn("text-[0.8rem] text-muted-foreground", className)} {...props}>
      {children}
    </Text>
  );
}

interface FormMessageNativeProps extends FormMessageProps, TextProps {}

function FormMessage({ children, className, ...props }: FormMessageNativeProps) {
  if (!children) return null;

  return (
    <Text className={cn("text-[0.8rem] font-medium text-destructive", className)} {...props}>
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
