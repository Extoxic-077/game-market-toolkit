# Security notes

- Treat all external input as untrusted.
- Validate monetary amounts on the server; never trust browser-submitted totals.
- Verify payment provider webhooks using provider-specific official SDKs or documented cryptographic procedures.
- Add timestamp validation, replay protection, and idempotency at the integration layer.
- Use constant-time comparison for secret-derived signatures where appropriate.
- Do not log secrets, access tokens, payment data, or personal customer information.
- Use database transactions and concurrency controls for order state changes.
- The toolkit's order transition helper is not an authorization or payment-verification mechanism.
- Keep dependencies updated and review security advisories.

The toolkit does not currently implement payment webhook verification.
