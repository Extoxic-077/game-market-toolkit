import { describe, expect, it } from "vitest";
import { calculateFees, ValidationError } from "../../src/index.js";

describe("calculateFees", () => {
  it("calculates a 10% platform fee", () => {
    expect(calculateFees({ amount: 10000, currency: "USD", platformFeeBps: 1000 })).toEqual({
      subtotal: { amount: 10000, currency: "USD" },
      platformFee: { amount: 1000, currency: "USD" },
      sellerProceeds: { amount: 9000, currency: "USD" }
    });
  });
  it("rounds half up to the nearest minor unit", () => {
    expect(calculateFees({ amount: 5, currency: "USD", platformFeeBps: 1000 }).platformFee.amount).toBe(1);
  });
  it("supports zero and maximum fees", () => {
    expect(calculateFees({ amount: 500, currency: "USD", platformFeeBps: 0 }).sellerProceeds.amount).toBe(500);
    expect(calculateFees({ amount: 500, currency: "USD", platformFeeBps: 10000 }).sellerProceeds.amount).toBe(0);
  });
  it("rejects invalid inputs", () => {
    expect(() => calculateFees({ amount: -1, currency: "USD", platformFeeBps: 100 })).toThrow(ValidationError);
    expect(() => calculateFees({ amount: 100, currency: "USD", platformFeeBps: 10001 })).toThrow(ValidationError);
    expect(() => calculateFees({ amount: 1.5, currency: "USD", platformFeeBps: 100 })).toThrow(ValidationError);
  });
});
