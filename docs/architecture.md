# Architecture

GameMarket Toolkit is a framework-independent utility library. It does not own persistence, authentication, payment processing, delivery, or marketplace business operations.

## Modules
- `core`: shared errors and public types.
- `money`: integer minor-unit monetary representation and arithmetic.
- `pricing`: fee calculations.
- `listings`: runtime input validation.
- `orders`: order states and transition policies.
- `sellers`: basic seller performance calculations.

## Design boundaries
The library provides deterministic functions. Applications remain responsible for authorization, database transactions, concurrency, payment-provider verification, audit records, seller due diligence, and compliance.

## Package outputs
The package is built as ESM and CommonJS, with TypeScript declaration files. Source imports use `.js` extensions to work with NodeNext module resolution.
