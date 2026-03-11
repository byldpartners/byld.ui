import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./Form.web";

describe("Form", () => {
  it("renders a form element", () => {
    render(<Form data-testid="form">content</Form>);
    expect(screen.getByTestId("form").tagName).toBe("FORM");
  });

  it("merges custom className", () => {
    render(<Form data-testid="form" className="my-form">content</Form>);
    expect(screen.getByTestId("form").className).toContain("my-form");
  });
});

describe("FormField + context", () => {
  it("links FormLabel htmlFor to FormControl id", () => {
    render(
      <FormField name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl data-testid="control">
            <input />
          </FormControl>
        </FormItem>
      </FormField>,
    );

    const label = screen.getByText("Email");
    const control = screen.getByTestId("control");

    // The label's htmlFor should match the control's id
    expect(label.getAttribute("for")).toBe(control.id);
  });
});

describe("FormDescription", () => {
  it("renders description text", () => {
    render(<FormDescription>Enter your email</FormDescription>);
    expect(screen.getByText("Enter your email")).toBeDefined();
  });

  it("applies muted styling", () => {
    render(<FormDescription>desc</FormDescription>);
    expect(screen.getByText("desc").className).toContain("text-muted-foreground");
  });
});

describe("FormMessage", () => {
  it("renders when children provided", () => {
    render(<FormMessage>Error!</FormMessage>);
    expect(screen.getByText("Error!")).toBeDefined();
  });

  it("does not render when no children", () => {
    const { container } = render(<FormMessage />);
    expect(container.innerHTML).toBe("");
  });

  it("applies destructive styling", () => {
    render(<FormMessage>Error!</FormMessage>);
    expect(screen.getByText("Error!").className).toContain("text-destructive");
  });
});
