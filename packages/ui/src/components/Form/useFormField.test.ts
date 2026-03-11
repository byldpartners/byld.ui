import { createElement } from "react";
import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { FormFieldContext, useFormFieldContext } from "./useFormField";

describe("useFormFieldContext", () => {
  it("defaults to empty id and name", () => {
    const { result } = renderHook(() => useFormFieldContext());
    expect(result.current.id).toBe("");
    expect(result.current.name).toBe("");
  });

  it("returns provided values from context", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) =>
      createElement(
        FormFieldContext.Provider,
        { value: { id: "test-id", name: "email" } },
        children,
      );

    const { result } = renderHook(() => useFormFieldContext(), { wrapper });
    expect(result.current.id).toBe("test-id");
    expect(result.current.name).toBe("email");
  });
});
