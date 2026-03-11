import React from "react";
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { AlertContext, useAlertContext } from "./useAlert";

describe("useAlertContext", () => {
  it("defaults to 'default' variant", () => {
    const { result } = renderHook(() => useAlertContext());
    expect(result.current).toBe("default");
  });

  it("returns provided variant from context", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      React.createElement(AlertContext.Provider, { value: "destructive" }, children);

    const { result } = renderHook(() => useAlertContext(), { wrapper });
    expect(result.current).toBe("destructive");
  });
});
