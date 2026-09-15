# `isPrime`

**Added in:** `0.1.0`

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

`isPrime` uses deterministic Miller–Rabin with a fixed witness set.

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
