import { describe, expect, it } from "vitest";
import { calculateSellerReputation, ValidationError } from "../../src/index.js";

describe("calculateSellerReputation", () => {
  it("calculates completion rate and weighted score", () => {
    expect(calculateSellerReputation({ completedOrders: 90, totalOrders: 100, averageRating: 4.5 })).toEqual({
      completionRate: 0.9,
      averageRating: 4.5,
      score: 87
    });
  });
  it("returns no score without order history", () => {
    expect(calculateSellerReputation({ completedOrders: 0, totalOrders: 0, averageRating: null })).toEqual({
      completionRate: null,
      averageRating: null,
      score: null
    });
  });
  it("does not invent a rating when none is available", () => {
    expect(calculateSellerReputation({ completedOrders: 5, totalOrders: 5, averageRating: null }).score).toBeNull();
  });
  it("rejects inconsistent or invalid values", () => {
    expect(() => calculateSellerReputation({ completedOrders: 6, totalOrders: 5, averageRating: 5 })).toThrow(ValidationError);
    expect(() => calculateSellerReputation({ completedOrders: 1, totalOrders: 2, averageRating: 6 })).toThrow(ValidationError);
  });
});
