import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDataTable, getCellValue } from "./useDataTable";
import type { ColumnDef } from "./DataTable.types";

interface Row {
  name: string;
  age: number;
}

const columns: ColumnDef<Row>[] = [
  { id: "name", header: "Name", accessorKey: "name", sortable: true },
  { id: "age", header: "Age", accessorKey: "age", sortable: true },
];

const data: Row[] = [
  { name: "Charlie", age: 30 },
  { name: "Alice", age: 25 },
  { name: "Bob", age: 35 },
];

describe("getCellValue", () => {
  it("gets value by accessorKey", () => {
    expect(getCellValue(columns[0], data[0])).toBe("Charlie");
  });

  it("gets value by accessorFn", () => {
    const col: ColumnDef<Row> = {
      id: "custom",
      header: "Custom",
      accessorFn: (row) => `${row.name}-${row.age}`,
    };
    expect(getCellValue(col, data[0])).toBe("Charlie-30");
  });

  it("returns undefined when no accessor", () => {
    const col: ColumnDef<Row> = { id: "empty", header: "Empty" };
    expect(getCellValue(col, data[0])).toBeUndefined();
  });
});

describe("useDataTable", () => {
  it("returns unsorted data initially", () => {
    const { result } = renderHook(() => useDataTable({ columns, data }));
    expect(result.current.sortedData).toEqual(data);
    expect(result.current.sortColumn).toBeNull();
    expect(result.current.sortDirection).toBeNull();
  });

  it("sorts ascending on first click", () => {
    const { result } = renderHook(() => useDataTable({ columns, data }));
    act(() => result.current.handleSort("name"));
    expect(result.current.sortColumn).toBe("name");
    expect(result.current.sortDirection).toBe("asc");
    expect(result.current.sortedData.map((r) => r.name)).toEqual([
      "Alice",
      "Bob",
      "Charlie",
    ]);
  });

  it("sorts descending on second click", () => {
    const { result } = renderHook(() => useDataTable({ columns, data }));
    act(() => result.current.handleSort("name"));
    act(() => result.current.handleSort("name"));
    expect(result.current.sortDirection).toBe("desc");
    expect(result.current.sortedData.map((r) => r.name)).toEqual([
      "Charlie",
      "Bob",
      "Alice",
    ]);
  });

  it("clears sort on third click", () => {
    const { result } = renderHook(() => useDataTable({ columns, data }));
    act(() => result.current.handleSort("name"));
    act(() => result.current.handleSort("name"));
    act(() => result.current.handleSort("name"));
    expect(result.current.sortColumn).toBeNull();
    expect(result.current.sortDirection).toBeNull();
    expect(result.current.sortedData).toEqual(data);
  });

  it("resets to ascending when switching columns", () => {
    const { result } = renderHook(() => useDataTable({ columns, data }));
    act(() => result.current.handleSort("name"));
    act(() => result.current.handleSort("age"));
    expect(result.current.sortColumn).toBe("age");
    expect(result.current.sortDirection).toBe("asc");
    expect(result.current.sortedData.map((r) => r.age)).toEqual([25, 30, 35]);
  });

  it("sorts numeric values correctly", () => {
    const { result } = renderHook(() => useDataTable({ columns, data }));
    act(() => result.current.handleSort("age"));
    expect(result.current.sortedData.map((r) => r.age)).toEqual([25, 30, 35]);
  });
});
