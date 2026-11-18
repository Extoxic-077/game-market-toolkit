# Contributing

Thank you for considering a contribution to GameMarket Toolkit.

## Before opening an issue
- Search existing issues and discussions.
- Include a clear description and a minimal reproduction where possible.
- Never include credentials, customer information, private marketplace data, or secrets.

## Pull requests
1. Fork the repository and create a focused branch.
2. Install dependencies with `npm ci`.
3. Add or update tests for behavior changes.
4. Run `npm run check`.
5. Update documentation and changelog where appropriate.
6. Open a pull request describing the motivation and implementation.

## Contribution expectations
- Keep the package framework-independent.
- Prefer small, composable functions.
- Avoid unnecessary runtime dependencies.
- Preserve strict TypeScript types.
- Do not use floating-point arithmetic for monetary calculations.
- Explain rounding, validation, and state-transition behavior.

By submitting a contribution, you agree that it may be distributed under the project's MIT license.
