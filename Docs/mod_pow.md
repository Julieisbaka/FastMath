# `modPow`

**Added in:** `0.1.5`

## Version history

- **`0.2.2`** — Runs the whole exponentiation in `BigInt` when the modulus
 exceeds `94,906,265`, replacing a per-multiplication conversion with one
 conversion per call, and keeps small moduli on pure `number` arithmetic.
- **`0.2.2`** — Returns immediately for modulus `1` and exponent `0`.

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

The implementation uses exponentiation by squaring, requiring $O(\log exponent)$ modular multiplications and $O(1)$ additional space. A modulus of at most `94,906,265` keeps every residue product inside the exact safe-integer range, so that path uses plain `number` arithmetic. Larger moduli run the entire loop in `BigInt`, converting the base, exponent, and modulus once per call instead of once per multiplication. `isPrime` shares the unchecked internal core to avoid repeating validation in its Miller–Rabin hot path.
