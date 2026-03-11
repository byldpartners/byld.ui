import { createContext, useContext } from "react";
import type { AlertVariant } from "./Alert.types";

const AlertContext = createContext<AlertVariant>("default");

function useAlertContext() {
  return useContext(AlertContext);
}

export { AlertContext, useAlertContext };
