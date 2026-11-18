import { describe, expect, it } from "vitest";
import { canTransitionOrder, InvalidTransitionError, transitionOrder, ValidationError } from "../../src/index.js";

describe("order transitions", () => {
  it("allows valid default transitions", () => {
    expect(canTransitionOrder("PENDING_PAYMENT", "PAID")).toBe(true);
    expect(transitionOrder("PAID", "PROCESSING")).toBe("PROCESSING");
  });
  it("rejects invalid transitions", () => {
    expect(canTransitionOrder("PENDING_PAYMENT", "DELIVERED")).toBe(false);
    expect(() => transitionOrder("PENDING_PAYMENT", "DELIVERED")).toThrow(InvalidTransitionError);
  });
  it("allows explicit policy overrides", () => {
    const policy = { PAID: ["DELIVERED"] as const };
    expect(transitionOrder("PAID", "DELIVERED", policy)).toBe("DELIVERED");
  });
  it("rejects unknown states at runtime", () => {
    expect(() => transitionOrder("UNKNOWN" as never, "PAID")).toThrow(ValidationError);
  });
});
