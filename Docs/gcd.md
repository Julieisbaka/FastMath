# `gcd`

## Version history

- **`0.1.4`** — Added zero, equality, and operand-order fast paths and shared the validated core with `lcm`.
- **`0.1.1`** — Added `gcd`.

Returns the greatest common divisor of two safe integers.

## Signature

```ts
gcd(a: number, b: number): number
```

The result is always non-negative. `gcd(0, 0)` returns `0`.

## Examples

```ts
import { gcd } from "zmath";

gcd(48, 18); // 6
gcd(17, 13); // 1
gcd(-48, 18); // 6
gcd(0, 24); // 24
```

## Errors

Throws `RangeError` if either argument is not a safe integer, including fractional values, `NaN`, infinities, and values outside the safe-integer range.

## Performance

`gcd` uses the iterative Euclidean algorithm with modulo arithmetic and does not allocate during calculation. Zero and equal inputs return immediately, and operands are ordered before the loop to avoid an unnecessary first iteration. Its runtime is logarithmic in the size of the input values.
