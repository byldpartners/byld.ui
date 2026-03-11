const ERROR_MESSAGE = "@byldpartners/ui: HoverCard is not supported on native.";

function HoverCard(): never {
  throw new Error(ERROR_MESSAGE);
}

function HoverCardTrigger(): never {
  throw new Error(ERROR_MESSAGE);
}

function HoverCardContent(): never {
  throw new Error(ERROR_MESSAGE);
}

export { HoverCard, HoverCardTrigger, HoverCardContent };
