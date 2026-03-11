import { createContext, useContext, useId } from "react";

interface FormFieldContextValue {
  id: string;
  name: string;
}

const FormFieldContext = createContext<FormFieldContextValue>({
  id: "",
  name: "",
});

function useFormFieldContext() {
  return useContext(FormFieldContext);
}

function useFormFieldId() {
  return useId();
}

export { FormFieldContext, useFormFieldContext, useFormFieldId };
export type { FormFieldContextValue };
