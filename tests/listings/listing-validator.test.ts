import { describe, expect, it } from "vitest";
import { validateListing } from "../../src/index.js";

const validListing = {
  title: "Rare game item",
  description: "A well-maintained digital item for a supported game.",
  gameId: "example-game",
  category: "weapons",
  price: { amount: 2500, currency: "USD" },
  stock: 2,
  deliveryMethod: "manual"
};

describe("validateListing", () => {
  it("accepts a valid listing", () => {
    expect(validateListing(validListing).success).toBe(true);
  });
  it("returns structured errors for invalid input", () => {
    const result = validateListing({ ...validListing, title: "x", stock: -1 });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.errors.length).toBeGreaterThan(0);
  });
  it("rejects unexpected properties", () => {
    expect(validateListing({ ...validListing, sellerPassword: "secret" }).success).toBe(false);
  });
  it("rejects lowercase currency codes", () => {
    expect(validateListing({ ...validListing, price: { amount: 100, currency: "usd" } }).success).toBe(false);
  });
});
