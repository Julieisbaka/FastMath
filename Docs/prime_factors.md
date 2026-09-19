# `primeFactors`

Returns the prime factorization of a positive safe integer.

## Version history

- **`0.2.2`** — Tests large inputs for primality before allocating factorization
 state, returning large prime inputs without trial division or Pollard Rho setup.
- **`0.2.0`** — Added wheel trial division with deterministic Pollard Rho fallback.

## Signature

```ts
primeFactors(value: number): number[]
```

## Returns

Returns prime factors in ascending order, including repeated factors. The
factorization of `1` is the empty array.

## Errors

Throws `RangeError` unless `value` is a positive safe integer.

## Examples

```ts
import { primeFactors } from "numwise";

primeFactors(360); // [2, 2, 2, 3, 3, 5]
primeFactors(97); // [97]
```

## Algorithm and performance

Factors `2`, `3`, and `5` are removed directly, followed by a `30`-wheel trial
division pass for small factors. Remaining composite values are split with
Pollard Rho and tested with the package's deterministic safe-integer primality
test. Results are sorted before returning.
