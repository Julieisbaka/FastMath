# Changelog

## [0.1.4] - 2026-09-18

- Optimized `lcm` with direct reuse of `gcd` and fast paths for equal and unit inputs.

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
- Created Zmath
