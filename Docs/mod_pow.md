# `modPow`

**Added in:** `0.1.5`

Computes modular exponentiation exactly for safe integer inputs.

## Signature

```ts
modPow(base: number, exponent: number, modulus: number): number
```

## Parameters

- `base` — A safe integer; negative bases are supported.
- `exponent` — A non-negative safe integer.
- `modulus` — A positive safe integer.

## Returns

Returns $(base^{exponent}) \bmod modulus$ in the range `0` through `modulus - 1`. A zero exponent returns `1` except when the modulus is `1`, where the result is `0`.

## Errors

Throws `RangeError` when:

- `base` or `exponent` is not a safe integer
- `exponent` is negative
- `modulus` is not a positive safe integer

```ts
import { modPow } from "numwise";

modPow(2, 10, 1000); // 24
modPow(-2, 3, 5); // 2
modPow(3, 0, 7); // 1
```

## Algorithm and performance

The implementation uses exponentiation by squaring, requiring $O(\log exponent)$ modular multiplications and $O(1)$ additional space. Products that remain within the exact safe-integer range use fast `number` arithmetic. Larger modular products use an exact `BigInt` fallback. `isPrime` shares the unchecked internal core to avoid repeating validation in its Miller–Rabin hot path.
