import { useState, useEffect, useCallback } from "react";

export interface ToasterToast {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
  action?: { label: string; onPress: () => void };
  duration?: number;
}

// ---- Global toast state ----

let toastCount = 0;
function genId() {
  toastCount = (toastCount + 1) % Number.MAX_SAFE_INTEGER;
  return toastCount.toString();
}

const toastListeners: Array<(toasts: ToasterToast[]) => void> = [];
let toastState: ToasterToast[] = [];

function notifyListeners() {
  toastListeners.forEach((l) => l([...toastState]));
}

function toast(props: Omit<ToasterToast, "id">) {
  const id = genId();
  const newToast: ToasterToast = { ...props, id };
  toastState = [newToast, ...toastState];
  notifyListeners();
  return {
    id,
    dismiss: () => {
      toastState = toastState.filter((t) => t.id !== id);
      notifyListeners();
    },
  };
}

function useToast() {
  const [toasts, setToasts] = useState<ToasterToast[]>(toastState);

  useEffect(() => {
    toastListeners.push(setToasts);
    return () => {
      const idx = toastListeners.indexOf(setToasts);
      if (idx > -1) toastListeners.splice(idx, 1);
    };
  }, []);

  const dismiss = useCallback((id?: string) => {
    if (id) {
      toastState = toastState.filter((t) => t.id !== id);
    } else {
      toastState = [];
    }
    notifyListeners();
  }, []);

  return { toasts, toast, dismiss };
}

export { toast, useToast };
