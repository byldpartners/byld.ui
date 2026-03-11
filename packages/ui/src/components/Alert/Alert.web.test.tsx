import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Alert, AlertTitle, AlertDescription, alertVariants } from "./Alert.web";

describe("Alert", () => {
  it("renders with role=alert", () => {
    render(<Alert>content</Alert>);
    expect(screen.getByRole("alert")).toBeDefined();
  });

  it("applies default variant", () => {
    render(<Alert>content</Alert>);
    expect(screen.getByRole("alert").className).toContain("bg-background");
  });

  it("applies destructive variant", () => {
    render(<Alert variant="destructive">err</Alert>);
    expect(screen.getByRole("alert").className).toContain("text-destructive");
  });

  it("merges custom className", () => {
    render(<Alert className="my-alert">content</Alert>);
    expect(screen.getByRole("alert").className).toContain("my-alert");
  });

  it("alertVariants generates correct classes", () => {
    expect(alertVariants({ variant: "destructive" })).toContain("text-destructive");
  });
});

describe("AlertTitle", () => {
  it("renders as h5", () => {
    render(<AlertTitle>Title</AlertTitle>);
    const el = screen.getByText("Title");
    expect(el.tagName).toBe("H5");
  });

  it("merges className", () => {
    render(<AlertTitle className="custom">Title</AlertTitle>);
    expect(screen.getByText("Title").className).toContain("custom");
  });
});

describe("AlertDescription", () => {
  it("renders children", () => {
    render(<AlertDescription>Desc</AlertDescription>);
    expect(screen.getByText("Desc")).toBeDefined();
  });
});
