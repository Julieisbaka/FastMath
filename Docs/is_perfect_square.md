# `isPerfectSquare`

Tests whether a non-negative safe integer is a perfect square.

## Version history

- **`0.2.0`** — Added the exact `integerSqrt`-based square test.

## Signature

```ts
isPerfectSquare(value: number): boolean
```

## Returns

Returns `true` exactly when an integer `r` exists such that $r^2 = value$.

## Errors

Throws the same `RangeError` as `integerSqrt` for negative, fractional,
non-finite, or unsafe values.

## Examples

```ts
import { isPerfectSquare } from "fastmath";

isPerfectSquare(144); // true
isPerfectSquare(145); // false
```

## Algorithm and performance

It computes the exact integer square root and compares its square with the
input. The operation is exact and uses constant additional space.
