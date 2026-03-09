import { forwardRef, createContext, useContext, useId } from "react";
import { cn } from "../../utils/cn";

interface FormFieldContextValue {
  id: string;
  name: string;
}

const FormFieldContext = createContext<FormFieldContextValue>({
  id: "",
  name: "",
});

const Form = forwardRef<HTMLFormElement, React.FormHTMLAttributes<HTMLFormElement>>(
  ({ className, ...props }, ref) => {
    return (
      <form ref={ref} className={cn("space-y-6", className)} {...props} />
    );
  },
);
Form.displayName = "Form";

interface FormFieldProps {
  name: string;
  children?: React.ReactNode;
}

function FormField({ name, children }: FormFieldProps) {
  const id = useId();
  return (
    <FormFieldContext.Provider value={{ id, name }}>
      {children}
    </FormFieldContext.Provider>
  );
}
FormField.displayName = "FormField";

const FormItem = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    );
  },
);
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => {
    const { id } = useContext(FormFieldContext);
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className,
        )}
        htmlFor={id}
        {...props}
      />
    );
  },
);
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const { id } = useContext(FormFieldContext);
    return (
      <div
        ref={ref}
        id={id}
        className={cn("", className)}
        {...props}
      />
    );
  },
);
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  if (!children) return null;

  return (
    <p
      ref={ref}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});
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
