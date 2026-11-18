import { ValidationError } from "../core/errors.js";

export interface SellerReputationInput {
  readonly completedOrders: number;
  readonly totalOrders: number;
  readonly averageRating: number | null;
}

export interface SellerReputation {
  readonly completionRate: number | null;
  readonly averageRating: number | null;
  readonly score: number | null;
}

function assertCount(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new ValidationError(`${name} must be a non-negative safe integer`);
  }
}

export function calculateSellerReputation(input: SellerReputationInput): SellerReputation {
  assertCount(input.completedOrders, "completedOrders");
  assertCount(input.totalOrders, "totalOrders");
  if (input.completedOrders > input.totalOrders) {
    throw new ValidationError("completedOrders cannot exceed totalOrders");
  }
  if (input.averageRating !== null &&
      (!Number.isFinite(input.averageRating) || input.averageRating < 0 || input.averageRating > 5)) {
    throw new ValidationError("averageRating must be null or a number between 0 and 5");
  }
  if (input.totalOrders === 0) {
    return Object.freeze({ completionRate: null, averageRating: input.averageRating, score: null });
  }
  const completionRate = input.completedOrders / input.totalOrders;
  const score = input.averageRating === null
    ? null
    : Math.round(((input.averageRating / 5) * 0.7 + completionRate * 0.3) * 10000) / 100;
  return Object.freeze({
    completionRate: Math.round(completionRate * 10000) / 10000,
    averageRating: input.averageRating,
    score
  });
}
