# `integerSqrt`

**Added in:** `0.1.1`

Returns the exact integer floor of the square root of a non-negative safe integer.

## Signature

```ts
integerSqrt(value: number): number
```

## Parameters

- `value` — A non-negative safe integer from `0` through `Number.MAX_SAFE_INTEGER`.

## Returns

Returns the greatest integer $r$ such that $r^2 \leq value$.

For example:

```ts
integerSqrt(25); // 5
integerSqrt(26); // 5
integerSqrt(80); // 8
```

## Errors

Throws `RangeError` when `value` is:

- Negative
- Non-integral
- `NaN`
- Positive or negative infinity
- Greater than `Number.MAX_SAFE_INTEGER`

```ts
import { integerSqrt } from "fastmath";

integerSqrt(-1); // throws RangeError
integerSqrt(1.5); // throws RangeError
```

## Accuracy

The result is exact for every supported input and satisfies:

$$
r^2 \leq value < (r + 1)^2
$$

The implementation uses the native square root only as an initial estimate, then applies exact integer corrections. This avoids floating-point rounding errors at the returned result.
