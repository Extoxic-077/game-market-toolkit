export class GameMarketError extends Error {
  public readonly code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = "GameMarketError";
    this.code = code;
  }
}

export class ValidationError extends GameMarketError {
  constructor(message: string) {
    super(message, "VALIDATION_ERROR");
    this.name = "ValidationError";
  }
}

export class CurrencyMismatchError extends GameMarketError {
  constructor(expected: string, received: string) {
    super(`Currency mismatch: expected ${expected}, received ${received}`, "CURRENCY_MISMATCH");
    this.name = "CurrencyMismatchError";
  }
}

export class InvalidTransitionError extends GameMarketError {
  constructor(from: string, to: string) {
    super(`Order transition from ${from} to ${to} is not allowed`, "INVALID_ORDER_TRANSITION");
    this.name = "InvalidTransitionError";
  }
}
