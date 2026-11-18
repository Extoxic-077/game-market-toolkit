import { describe, expect, it } from "vitest";
import {
  addMoney, formatMoney, money, moneyFromMajor, multiplyMoney, subtractMoney,
  CurrencyMismatchError, ValidationError
} from "../../src/index.js";

describe("money utilities", () => {
  it("creates immutable money values", () => {
    const value = money(1250, "usd");
    expect(value).toEqual({ amount: 1250, currency: "USD" });
    expect(Object.isFrozen(value)).toBe(true);
  });
  it("parses decimal major units without floating-point conversion", () => {
    expect(moneyFromMajor("12.34", "USD")).toEqual({ amount: 1234, currency: "USD" });
    expect(moneyFromMajor("-2", "JPY")).toEqual({ amount: -2, currency: "JPY" });
    expect(moneyFromMajor("1.234", "KWD")).toEqual({ amount: 1234, currency: "KWD" });
  });
  it("rejects excessive decimal places and malformed amounts", () => {
    expect(() => moneyFromMajor("1.234", "USD")).toThrow(ValidationError);
    expect(() => moneyFromMajor("01.20", "USD")).toThrow(ValidationError);
  });
  it("adds and subtracts matching currencies", () => {
    expect(addMoney(money(500, "USD"), money(250, "USD")).amount).toBe(750);
    expect(subtractMoney(money(500, "USD"), money(250, "USD")).amount).toBe(250);
  });
  it("rejects currency mismatch", () => {
    expect(() => addMoney(money(100, "USD"), money(100, "EUR"))).toThrow(CurrencyMismatchError);
  });
  it("multiplies by integer factors", () => {
    expect(multiplyMoney(money(125, "USD"), 3).amount).toBe(375);
    expect(() => multiplyMoney(money(125, "USD"), 1.5)).toThrow(ValidationError);
  });
  it("formats using the currency exponent", () => {
    expect(formatMoney(money(1234, "USD"), "en-US")).toBe("$12.34");
    expect(formatMoney(money(1234, "JPY"), "ja-JP")).toContain("1,234");
  });
  it("rejects unsafe amounts", () => {
    expect(() => money(Number.MAX_SAFE_INTEGER + 1, "USD")).toThrow(ValidationError);
  });
});
