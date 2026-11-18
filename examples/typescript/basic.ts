import {
  calculateFees,
  formatMoney,
  moneyFromMajor,
  validateListing,
  transitionOrder,
  calculateSellerReputation
} from "../../src/index.js";

const price = moneyFromMajor("49.99", "USD");
const fees = calculateFees({ amount: price.amount, currency: price.currency, platformFeeBps: 750 });
console.log("Platform fee:", formatMoney(fees.platformFee));
console.log("Seller proceeds:", formatMoney(fees.sellerProceeds));

const listing = validateListing({
  title: "Example digital item",
  description: "An example listing for toolkit demonstration.",
  gameId: "example-game",
  category: "items",
  price,
  stock: 3,
  deliveryMethod: "manual"
});
if (!listing.success) throw new Error(JSON.stringify(listing.errors));

console.log("Next order state:", transitionOrder("PENDING_PAYMENT", "PAID"));
console.log(calculateSellerReputation({ completedOrders: 18, totalOrders: 20, averageRating: 4.7 }));
