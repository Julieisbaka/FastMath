# `isPrime`

## Version history

- **`0.1.2`** — Replaced the previous Miller–Rabin witness set with the deterministic
  seven-witness set for the full supported safe-integer range.
- **`0.1.2`** — Corrected modular multiplication when `number` products exceed exact
  integer precision by using an exact `BigInt` fallback only on that path.
- **`0.1.0`** — Added `isPrime`.

Determines whether a value is a prime number.

## Signature

```ts
isPrime(value: number): boolean
```

## Parameters

- `value` — A safe JavaScript integer in the range `2` through `Number.MAX_SAFE_INTEGER`.

## Returns

Returns `true` when `value` is prime; otherwise returns `false`.

The function returns `false` for:

- Values below `2`
- Negative values
- Non-integers
- `NaN` and infinities
- Numbers larger than `Number.MAX_SAFE_INTEGER`
- Composite numbers

## Algorithm and accuracy

`isPrime` uses deterministic Miller–Rabin with the proven seven-witness set
`[2, 325, 9375, 28178, 450775, 9780504, 1795265022]`. This set is
deterministic for the full supported safe-integer range, so composite values
are not returned as prime pseudoprimes.

For modular products that exceed the exact `number` multiplication range, the
implementation uses an exact `BigInt` fallback. Smaller products remain on
the faster `number` path.

The `0.1.2` update corrected large-value modular arithmetic and strengthened
the witness set to handle known strong pseudoprimes at the previous boundary.

## Examples

```ts
import { isPrime } from "zmath";

isPrime(2); // true
isPrime(97); // true
isPrime(100); // false
isPrime(1); // false
isPrime(3.14); // false
```

## Notes

JavaScript `number` values cannot represent every integer above `Number.MAX_SAFE_INTEGER`. Values outside the documented safe-integer range are rejected rather than approximated.
