import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input.web";

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Type here" />);
    expect(screen.getByPlaceholderText("Type here")).toBeDefined();
  });

  it("applies type prop", () => {
    render(<Input type="email" placeholder="email" />);
    expect(screen.getByPlaceholderText("email")).toHaveProperty("type", "email");
  });

  it("merges custom className", () => {
    render(<Input className="my-input" placeholder="test" />);
    expect(screen.getByPlaceholderText("test").className).toContain("my-input");
  });

  it("forwards disabled prop", () => {
    render(<Input disabled placeholder="test" />);
    expect(screen.getByPlaceholderText("test")).toHaveProperty("disabled", true);
  });

  it("forwards value and onChange", () => {
    const onChange = vi.fn();
    render(<Input value="hello" onChange={onChange} />);
    const input = screen.getByDisplayValue("hello");
    fireEvent.change(input, { target: { value: "world" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards ref", () => {
    let ref: HTMLInputElement | null = null;
    render(<Input ref={(el) => { ref = el; }} placeholder="test" />);
    expect(ref).toBeInstanceOf(HTMLInputElement);
  });
});
