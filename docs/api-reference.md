# API reference

The package root exports all supported public APIs.

## Money
- `money(amount, currency)`: create a validated immutable money value.
- `moneyFromMajor(decimalString, currency)`: parse a major-unit decimal string.
- `addMoney(left, right)`: add same-currency values.
- `subtractMoney(left, right)`: subtract same-currency values.
- `multiplyMoney(value, integerFactor)`: multiply by an integer.
- `formatMoney(value, locale?)`: format for display.
- `normalizeCurrency(currency)`: normalize and validate a three-letter code.
- `currencyExponent(currency)`: return the configured minor-unit exponent.

## Pricing
- `calculateFees(input)`: calculate subtotal, platform fee, and seller proceeds.
Fee basis points range from 0 through 10000. Fee rounding is half-up to the nearest minor unit.

## Listings
- `listingSchema`: exported Zod schema.
- `validateListing(input)`: return a discriminated success/error result.

## Orders
- `ORDER_STATES`: supported order state constants.
- `DEFAULT_ORDER_TRANSITIONS`: default transition policy.
- `canTransitionOrder(from, to, policy?)`: check a transition.
- `transitionOrder(from, to, policy?)`: return the next state or throw.

## Sellers
- `calculateSellerReputation(input)`: calculate completion rate and an illustrative weighted score.
