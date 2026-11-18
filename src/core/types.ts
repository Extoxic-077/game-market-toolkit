export interface Money {
  /** Integer amount in the currency's minor unit (for example, cents for USD). */
  readonly amount: number;
  /** Uppercase ISO 4217 currency code. */
  readonly currency: string;
}

export type Result<T, E = Error> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };
