import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./Table.web";

function renderTable() {
  return render(
    <Table>
      <TableCaption>A test table</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Alice</TableCell>
          <TableCell>25</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total: 1</TableCell>
        </TableRow>
      </TableFooter>
    </Table>,
  );
}

describe("Table", () => {
  it("renders a table element", () => {
    renderTable();
    expect(screen.getByRole("table")).toBeDefined();
  });

  it("renders header cells", () => {
    renderTable();
    expect(screen.getByText("Name").tagName).toBe("TH");
    expect(screen.getByText("Age").tagName).toBe("TH");
  });

  it("renders body cells", () => {
    renderTable();
    expect(screen.getByText("Alice").tagName).toBe("TD");
    expect(screen.getByText("25").tagName).toBe("TD");
  });

  it("renders caption", () => {
    renderTable();
    expect(screen.getByText("A test table").tagName).toBe("CAPTION");
  });

  it("renders footer", () => {
    renderTable();
    expect(screen.getByText("Total: 1")).toBeDefined();
  });

  it("merges className on Table", () => {
    render(<Table className="my-table"><TableBody><TableRow><TableCell>x</TableCell></TableRow></TableBody></Table>);
    expect(screen.getByRole("table").className).toContain("my-table");
  });

  it("wraps table in overflow container", () => {
    renderTable();
    const wrapper = screen.getByRole("table").parentElement!;
    expect(wrapper.className).toContain("overflow-auto");
  });
});
