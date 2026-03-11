import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  paginationLinkVariants,
} from "./Pagination.web";

describe("Pagination", () => {
  it("renders a nav with aria-label", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByRole("navigation", { name: "pagination" })).toBeDefined();
  });

  it("renders page links", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText("1")).toBeDefined();
    expect(screen.getByText("2")).toBeDefined();
  });

  it("marks active page with aria-current", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText("1").getAttribute("aria-current")).toBe("page");
  });

  it("renders Previous button with aria-label", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText("Previous")).toBeDefined();
  });

  it("renders Next button with aria-label", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText("Next")).toBeDefined();
  });

  it("renders ellipsis with sr-only text", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    );
    expect(screen.getByText("More pages")).toBeDefined();
  });

  it("paginationLinkVariants generates correct classes", () => {
    expect(paginationLinkVariants({ size: "default" })).toContain("px-4");
    expect(paginationLinkVariants({ size: "icon" })).toContain("w-9");
  });
});
