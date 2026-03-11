const ERROR_MESSAGE = "@byldpartners/ui: Command is not supported on native.";

function Command(): never {
  throw new Error(ERROR_MESSAGE);
}

export { Command };
