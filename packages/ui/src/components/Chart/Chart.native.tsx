const ERROR_MESSAGE = "@byldpartners/ui: Chart is not supported on native.";

function Chart(): never {
  throw new Error(ERROR_MESSAGE);
}

export { Chart };
