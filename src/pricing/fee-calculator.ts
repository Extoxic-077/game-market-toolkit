import { ValidationError } from "../core/errors.js";
import type { Money } from "../core/types.js";
import { money } from "../money/money.js";

export interface FeeCalculationInput {
  readonly amount: number;
  readonly currency: string;
  /** 1000 basis points = 10%; allowed range is 0–10000. */
  readonly platformFeeBps: number;
}

export interface FeeCalculation {
  readonly subtotal: Money;
  readonly platformFee: Money;
  readonly sellerProceeds: Money;
}

function roundBasisPoints(amount: number, basisPoints: number): number {
  const rounded = (BigInt(amount) * BigInt(basisPoints) + 5000n) / 10000n;
  if (rounded > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new ValidationError("Calculated fee exceeds the safe integer range");
  }
  return Number(rounded);
}

export function calculateFees(input: FeeCalculationInput): FeeCalculation {
  if (!Number.isSafeInteger(input.amount) || input.amount < 0) {
    throw new ValidationError("Amount must be a non-negative safe integer");
  }
  if (!Number.isInteger(input.platformFeeBps) || input.platformFeeBps < 0 || input.platformFeeBps > 10000) {
    throw new ValidationError("platformFeeBps must be an integer between 0 and 10000");
  }
  const feeAmount = roundBasisPoints(input.amount, input.platformFeeBps);
  return Object.freeze({
    subtotal: money(input.amount, input.currency),
    platformFee: money(feeAmount, input.currency),
    sellerProceeds: money(input.amount - feeAmount, input.currency)
  });
}
