# `primesUpTo`

Returns every prime number less than or equal to a limit.

## Version history

- **`0.2.0`** — Added `primesUpTo` using an odd-only base sieve and segmented marking.

## Signature

```ts
primesUpTo(limit: number): number[]
```

## Parameters

- `limit` — A safe integer from `0` through `100_000_000`.

## Returns

Returns primes in ascending order. A limit below `2` returns an empty array.

## Errors

Throws `RangeError` for negative, fractional, non-finite, unsafe, or larger
than `100_000_000` limits.

## Examples

```ts
import { primesUpTo } from "fastmath";

primesUpTo(10); // [2, 3, 5, 7]
```

## Algorithm and performance

An odd-only sieve generates base primes through `sqrt(limit)`. The result is
then marked in fixed-size segments, keeping the temporary composite buffer
bounded while avoiding repeated full-limit allocations. Runtime is
$O(n \log\log n)$ with output storage proportional to the number of primes.
