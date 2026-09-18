# `integerNthRoot`

Returns the exact integer floor of an n-th root.

## Version history

- **`0.2.0`** — Added exact Newton iteration with perfect-power correction.

## Signature

```ts
integerNthRoot(value: number, n: number): number
```

## Parameters

- `value` — A non-negative safe integer.
- `n` — A positive safe integer degree.

## Returns

Returns the greatest integer `r` such that $r^n \leq value$. Perfect powers
are returned exactly and non-perfect powers are floored.

## Errors

Throws `RangeError` for an invalid value or a degree less than `1`.

## Examples

```ts
import { integerNthRoot } from "numwise";

integerNthRoot(64, 3); // 4
integerNthRoot(65, 3); // 4
integerNthRoot(25, 2); // 5
```

## Algorithm and performance

Integer Newton iteration supplies the main convergence path. Bounded exact
power comparisons correct floating-point initial-estimate error and detect
perfect powers without unsafe `number` multiplication. Auxiliary arithmetic
uses constant space.
