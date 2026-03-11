const ERROR_MESSAGE = "@byldpartners/ui: Sidebar is not supported on native.";

function Sidebar(): never {
  throw new Error(ERROR_MESSAGE);
}

export { Sidebar };
