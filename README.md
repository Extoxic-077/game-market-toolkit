# GameMarket Toolkit

**Open-source TypeScript utilities for building gaming and digital-item marketplaces.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-22%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

GameMarket Toolkit is a collection of reusable, framework-independent utilities designed to help developers build safer and more maintainable gaming marketplaces and digital goods platforms.

## Features
- Safe money representation and arithmetic using integer minor units.
- Configurable platform fee calculations.
- Runtime validation for digital item listings.
- Configurable order state transitions.
- Seller completion and reputation calculations.
- TypeScript-first API with ESM and CommonJS builds.

## Requirements
- Node.js 22 or newer.
- npm 10 or newer recommended.

## Installation
The package is not published to npm yet. After publication:

```bash
npm install game-market-toolkit
```

For local development:

```bash
git clone https://github.com/Extoxic-077/game-market-toolkit.git
cd game-market-toolkit
npm install
```

## Quick start

```ts
import { calculateFees, moneyFromMajor, formatMoney } from "game-market-toolkit";

const price = moneyFromMajor("100.00", "USD");
const fees = calculateFees({
  amount: price.amount,
  currency: price.currency,
  platformFeeBps: 1000
});

console.log(formatMoney(fees.platformFee)); // $10.00
console.log(formatMoney(fees.sellerProceeds)); // $90.00
```

`amount` is always expressed in the currency's minor unit. For USD, 10000 represents $100.00. For zero-decimal currencies such as JPY, 1000 represents ¥1,000.

## API overview

### Money
```ts
import { moneyFromMajor, money, addMoney, formatMoney } from "game-market-toolkit";

const itemPrice = moneyFromMajor("19.99", "USD");
const shipping = money(500, "USD");
console.log(formatMoney(addMoney(itemPrice, shipping))); // $24.99
```

Money arithmetic rejects mixed currencies and unsafe integer results. `moneyFromMajor` accepts decimal strings to avoid binary floating-point parsing errors.

### Pricing
```ts
import { calculateFees } from "game-market-toolkit";

const breakdown = calculateFees({
  amount: 10000,
  currency: "USD",
  platformFeeBps: 1000
});
```

Basis points are used for fee rates: 100 basis points = 1%. Fee rounding is half-up to the nearest minor unit.

### Listing validation
```ts
import { validateListing } from "game-market-toolkit";

const result = validateListing({
  title: "Rare game item",
  description: "A digital item for a supported game.",
  gameId: "example-game",
  category: "items",
  price: { amount: 2500, currency: "USD" },
  stock: 1,
  deliveryMethod: "manual"
});

if (!result.success) console.error(result.errors);
else console.log(result.data);
```

Validation checks shape and basic field constraints. It does not establish ownership, authenticity, legal transferability, game-policy compliance, or whether a seller is authorized to sell an item.

### Order transitions
```ts
import { transitionOrder } from "game-market-toolkit";
const nextState = transitionOrder("PENDING_PAYMENT", "PAID");
```

The default transition map is a starting point, not a universal workflow. Applications should enforce authorization, payment verification, persistence, concurrency control, and audit logging themselves.

### Seller reputation
```ts
import { calculateSellerReputation } from "game-market-toolkit";

const reputation = calculateSellerReputation({
  completedOrders: 90,
  totalOrders: 100,
  averageRating: 4.5
});
```

The score is a transparent example calculation, not a fraud signal or a guarantee of seller quality. Applications should disclose their own scoring policies and avoid treating missing data as a positive rating.

## Development
```bash
npm install
npm run typecheck
npm run lint
npm test
npm run build
```

Run coverage with `npm run test:coverage`. Build output includes ESM, CommonJS, and TypeScript declaration files in `dist/`.

## Project status
Version `0.1.0` is an initial development release. Public APIs may change before `1.0.0`. The npm package has not been published.

## Contributing
Contributions, bug reports, feature suggestions, and documentation improvements are welcome. Read [CONTRIBUTING.md](.github/CONTRIBUTING.md) before opening a pull request.

## Security
Please report vulnerabilities privately. See [SECURITY.md](.github/SECURITY.md).

## License
MIT. See [LICENSE](LICENSE).

## Maintainer
Maintained by [Extoxic-077](https://github.com/Extoxic-077).

---
Built for developers creating gaming and digital-item marketplaces.
