# `gcd`

**Added in:** `0.1.1`

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

`gcd` uses the iterative Euclidean algorithm with modulo arithmetic and does not allocate during calculation. Its runtime is logarithmic in the size of the input values.
