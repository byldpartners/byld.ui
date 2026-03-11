import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Textarea } from "./Textarea.web";

describe("Textarea", () => {
  it("renders a textarea element", () => {
    render(<Textarea placeholder="Write here" />);
    expect(screen.getByPlaceholderText("Write here").tagName).toBe("TEXTAREA");
  });

  it("merges custom className", () => {
    render(<Textarea className="my-textarea" placeholder="test" />);
    expect(screen.getByPlaceholderText("test").className).toContain("my-textarea");
  });

  it("forwards disabled prop", () => {
    render(<Textarea disabled placeholder="test" />);
    expect(screen.getByPlaceholderText("test")).toHaveProperty("disabled", true);
  });

  it("forwards value and onChange", () => {
    const onChange = vi.fn();
    render(<Textarea value="hello" onChange={onChange} />);
    fireEvent.change(screen.getByDisplayValue("hello"), { target: { value: "world" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("forwards ref", () => {
    let ref: HTMLTextAreaElement | null = null;
    render(<Textarea ref={(el) => { ref = el; }} placeholder="test" />);
    expect(ref).toBeInstanceOf(HTMLTextAreaElement);
  });
});
