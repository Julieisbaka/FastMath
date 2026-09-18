# `lcm`

Computes the least common multiple of two safe integers exactly when the result fits the safe-integer range.

## Version history

- **`0.1.3-dev`** — Added `lcm`.

## Signature

```ts
lcm(a: number, b: number): number
```

## Parameters

- `a` — A safe integer.
- `b` — A safe integer.

## Returns

Returns the smallest non-negative integer that is divisible by both inputs. `lcm(0, n)` and `lcm(0, 0)` return `0`.

## Errors

Throws `RangeError` when either argument is not a safe integer or when the exact result exceeds `Number.MAX_SAFE_INTEGER`.

```ts
import { lcm } from "zmath";

lcm(12, 18); // 36
lcm(-4, 6); // 12
lcm(0, 24); // 0
```

## Algorithm and performance

The implementation first divides one input by the greatest common divisor, then multiplies by the other input. This avoids unnecessary intermediate growth and runs in $O(\log(\min(|a|, |b|)))$ time with $O(1)$ additional space.
