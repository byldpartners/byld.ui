const ERROR_MESSAGE = "@byldpartners/ui: Tooltip is not supported on native.";

function Tooltip(): never {
  throw new Error(ERROR_MESSAGE);
}

export { Tooltip };
