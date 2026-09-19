# Changelog

## [0.2.1] - 2026-09-18

- Optimized `primesUpTo` with odd-only segmented buffers and direct marking of
 odd multiples.
- Removed the per-segment initialization pass and used bounded bitwise index
 arithmetic in the sieve hot loops.
- Raised the `primesUpTo` limit to `1_000_000_000` while retaining bounded
 segmented sieve memory.

## [0.2.0] - 2026-09-18

- Added optimized `gcdMany` and `lcmMany` batch operations with early exits.
- Added `primesUpTo` with an odd-only base sieve and segmented marking.
- Added `primeFactors` with wheel trial division and Pollard Rho fallback.
- Added exact `integerNthRoot` Newton iteration and `isPerfectSquare`.

## [0.1.5] - 2026-09-18

- Exposed the exact modular exponentiation used by `isPrime` as `modPow`.
- Optimized `combination`'s exact overflow fallback to continue from its already-computed prefix.

## [0.1.4] - 2026-09-18

- Optimized `lcm` with direct reuse of `gcd` and fast paths for equal and unit inputs.
- Removed duplicate GCD validation from `lcm` by sharing the internal validated GCD core.
- Added zero, equality, and operand-order fast paths to `gcd`.

## [0.1.3] - 2026-09-15

- Added `lcm` and `permutation` for exact safe-integer arithmetic.

## [0.1.2] - 2026-09-15

This patch hardens large-integer correctness and adds exact combinatorics:

- Corrected `isPrime` modular multiplication for large safe integers with an exact overflow fallback.
- Strengthened `isPrime` with a deterministic witness set covering the supported safe-integer range.
- Added `combination`, an exact multiplicative binomial-coefficient function that uses symmetry, factor cancellation, and an exact fallback for safe final results with unsafe intermediate products.

## [0.1.1] - 2026-09-15

- Added `integerSqrt`, an exact integer square-root function for non-negative safe integers.
- Added `gcd`, an iterative Euclidean greatest-common-divisor function for safe integers.
- Added invalid-input validation with `RangeError` for unsupported values.

## [0.1.0] - Initial release

- Added `isPrime` function for checking prime numbers
- Created Numwise
