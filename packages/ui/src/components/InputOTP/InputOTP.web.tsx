import { forwardRef, useState, useRef, useCallback, createContext, useContext } from "react";
import { cn } from "../../utils/cn";
import type { InputOTPProps } from "./InputOTP.types";

interface InputOTPContextValue {
  value: string;
  activeIndex: number;
  length: number;
}

const InputOTPContext = createContext<InputOTPContextValue>({
  value: "",
  activeIndex: -1,
  length: 6,
});

const InputOTP = forwardRef<
  HTMLDivElement,
  InputOTPProps & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">
>(
  (
    {
      length = 6,
      value: controlledValue,
      onValueChange,
      disabled = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const [activeIndex, setActiveIndex] = useState(-1);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;

    const updateValue = useCallback(
      (newValue: string) => {
        const clamped = newValue.slice(0, length);
        if (controlledValue === undefined) {
          setInternalValue(clamped);
        }
        onValueChange?.(clamped);
      },
      [controlledValue, length, onValueChange],
    );

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        e.preventDefault();
        const chars = currentValue.split("");
        if (chars[index]) {
          chars[index] = "";
          updateValue(chars.join(""));
        } else if (index > 0) {
          chars[index - 1] = "";
          updateValue(chars.join(""));
          inputRefs.current[index - 1]?.focus();
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handleInput = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const char = e.target.value.slice(-1);
      if (!char) return;

      const chars = currentValue.split("");
      while (chars.length < length) chars.push("");
      chars[index] = char;
      updateValue(chars.join(""));

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").slice(0, length);
      updateValue(pasted);
      const nextIndex = Math.min(pasted.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    };

    return (
      <InputOTPContext.Provider value={{ value: currentValue, activeIndex, length }}>
        <div
          ref={ref}
          className={cn("flex items-center gap-2", disabled && "opacity-50", className)}
          onPaste={handlePaste}
          {...props}
        >
          {Array.from({ length }, (_, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={currentValue[i] || ""}
              disabled={disabled}
              onChange={(e) => handleInput(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onFocus={() => setActiveIndex(i)}
              onBlur={() => setActiveIndex(-1)}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent text-center text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed",
                activeIndex === i && "ring-1 ring-ring",
              )}
              autoComplete="one-time-code"
            />
          ))}
        </div>
      </InputOTPContext.Provider>
    );
  },
);
InputOTP.displayName = "InputOTP";

export { InputOTP };
