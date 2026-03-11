import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { toast, useToast } from "./useToast";

// Reset global toast state between tests
beforeEach(() => {
  const { result } = renderHook(() => useToast());
  act(() => result.current.dismiss());
});

describe("useToast", () => {
  it("starts with an empty toast list", () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it("adds a toast via the global toast function", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Hello" });
    });

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("Hello");
  });

  it("adds multiple toasts in order (newest first)", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "First" });
      toast({ title: "Second" });
    });

    expect(result.current.toasts).toHaveLength(2);
    expect(result.current.toasts[0].title).toBe("Second");
    expect(result.current.toasts[1].title).toBe("First");
  });

  it("dismisses a specific toast by id", () => {
    const { result } = renderHook(() => useToast());

    let toastRef: { id: string; dismiss: () => void };
    act(() => {
      toastRef = toast({ title: "To dismiss" });
      toast({ title: "To keep" });
    });

    act(() => toastRef.dismiss());

    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].title).toBe("To keep");
  });

  it("dismisses a toast by id via the hook", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "A" });
      toast({ title: "B" });
    });

    const idToDismiss = result.current.toasts[0].id;
    act(() => result.current.dismiss(idToDismiss));

    expect(result.current.toasts).toHaveLength(1);
  });

  it("dismisses all toasts when no id is provided", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "A" });
      toast({ title: "B" });
    });

    act(() => result.current.dismiss());

    expect(result.current.toasts).toEqual([]);
  });

  it("supports variant and description", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    });

    expect(result.current.toasts[0].variant).toBe("destructive");
    expect(result.current.toasts[0].description).toBe("Something went wrong");
  });

  it("generates unique ids for each toast", () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: "A" });
      toast({ title: "B" });
      toast({ title: "C" });
    });

    const ids = result.current.toasts.map((t) => t.id);
    expect(new Set(ids).size).toBe(3);
  });

  it("syncs across multiple hook instances", () => {
    const { result: hook1 } = renderHook(() => useToast());
    const { result: hook2 } = renderHook(() => useToast());

    act(() => {
      toast({ title: "Synced" });
    });

    expect(hook1.current.toasts).toHaveLength(1);
    expect(hook2.current.toasts).toHaveLength(1);
  });
});
