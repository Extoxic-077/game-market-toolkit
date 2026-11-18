import { CurrencyMismatchError, ValidationError } from "../core/errors.js";
import type { Money } from "../core/types.js";
import { currencyExponent, normalizeCurrency } from "./currency.js";

function assertSafeInteger(value: number, label: string): void {
  if (!Number.isSafeInteger(value)) {
    throw new ValidationError(`${label} must be a safe integer`);
  }
}

export function money(amount: number, currency: string): Money {
  assertSafeInteger(amount, "Money amount");
  return Object.freeze({ amount, currency: normalizeCurrency(currency) });
}

/** Parse a decimal major-unit string without floating-point arithmetic. */
export function moneyFromMajor(value: string, currency: string): Money {
  const code = normalizeCurrency(currency);
  const exponent = currencyExponent(code);
  const match = /^(-?)(0|[1-9]\d*)(?:\.(\d+))?$/.exec(value.trim());
  if (!match) throw new ValidationError(`Invalid monetary decimal: ${value}`);

  const sign = match[1] === "-" ? -1n : 1n;
  const whole = BigInt(match[2]!);
  const fraction = match[3] ?? "";
  if (fraction.length > exponent) {
    throw new ValidationError(`Too many decimal places for ${code}; maximum is ${exponent}`);
  }
  const scale = 10n ** BigInt(exponent);
  const fractional = BigInt((fraction + "0".repeat(exponent)).slice(0, exponent) || "0");
  const minor = sign * (whole * scale + fractional);
  if (minor > BigInt(Number.MAX_SAFE_INTEGER) || minor < BigInt(Number.MIN_SAFE_INTEGER)) {
    throw new ValidationError("Money amount exceeds the safe integer range");
  }
  return money(Number(minor), code);
}

function assertSameCurrency(left: Money, right: Money): void {
  if (left.currency !== right.currency) throw new CurrencyMismatchError(left.currency, right.currency);
}

export function addMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  const result = left.amount + right.amount;
  assertSafeInteger(result, "Sum");
  return money(result, left.currency);
}

export function subtractMoney(left: Money, right: Money): Money {
  assertSameCurrency(left, right);
  const result = left.amount - right.amount;
  assertSafeInteger(result, "Difference");
  return money(result, left.currency);
}

export function multiplyMoney(value: Money, factor: number): Money {
  assertSafeInteger(factor, "Factor");
  const result = value.amount * factor;
  assertSafeInteger(result, "Product");
  return money(result, value.currency);
}

export function formatMoney(value: Money, locale = "en-US"): string {
  const exponent = currencyExponent(value.currency);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: value.currency,
    minimumFractionDigits: exponent,
    maximumFractionDigits: exponent
  }).format(value.amount / 10 ** exponent);
}
