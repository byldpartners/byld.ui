import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./NavigationMenu.web";

describe("NavigationMenu", () => {
  it("renders a nav element", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  it("renders links", () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">Home</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("merges custom className", () => {
    render(
      <NavigationMenu className="my-nav">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="#">X</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );
    expect(screen.getByRole("navigation").className).toContain("my-nav");
  });

  it("navigationMenuTriggerStyle generates classes", () => {
    const classes = navigationMenuTriggerStyle();
    expect(classes).toContain("inline-flex");
    expect(classes).toContain("h-9");
  });
});
