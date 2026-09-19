# Numwise

Numwise is a mathematical library for exact safe integer calculations.

## Benchmarks

Run `npm run benchmark` for Numwise's regression workload, or
`npm run benchmark:compare` for a fair comparison with documented third-party
packages. See [docs/benchmarks.md](docs/benchmarks.md) for the compared APIs,
fairness rules, and interpretation guidance.

### Comparison snapshot

The following results were measured on September 18, 2026. Times are elapsed
milliseconds for the listed iteration count; lower is better within the same
table. `Max` is the slowest of seven samples. Package initialization is outside the timed region. Results vary with hardware, Node.js/V8, thermal conditions, and background activity, so run `npm run benchmark:compare` locally before making performance decisions.

| Environment | Value |
| --- | --- |
| Node | v24.15.0 |
| Platform | win32 x64 10.0.26200 |
| CPU | 12th Gen Intel(R) Core(TM) i5-12500H |
| OS | Windows 11 Home |

| Package | Version |
| --- | ---: |
| numwise | 0.2.3 |
| number-theory | 1.1.0 |
| compute-gcd | 1.2.1 |
| big-integer | 1.6.52 |
| mathjs | 15.2.0 |

#### `gcd/large` — 20,000 iterations

| Implementation | Median | Max | Checksum |
| --- | ---: | ---: | ---: |
| numwise gcd | 1.60 ms | 1.90 ms | 200001 |
| number-theory gcd | **1.40 ms** | **1.60 ms** | 200001 |
| compute-gcd | 16.77 ms | 17.91 ms | 200001 |
| mathjs gcd | 564.12 ms | 583.09 ms | 200001 |
| big-integer gcd | 29.01 ms | 30.63 ms | 200001 |

#### `lcm/safe-integer` — 20,000 iterations

| Implementation | Median | Max | Checksum |
| --- | ---: | ---: | ---: |
| big-integer lcm | 13.17 ms | 13.79 ms | 691876207 |
| numwise lcm | **0.28 ms** | **0.31 ms** | 691876207 |
| mathjs lcm | 0.41 ms | 0.43 ms | 691876207 |

#### `isPrime/medium` — 2,000 iterations

| Implementation | Median | Max | Checksum |
| --- | ---: | ---: | ---: |
| number-theory isPrime | 1767.38 ms | 1814.52 ms | 20001 |
| numwise isPrime | **0.29 ms** | **0.31 ms** | 20001 |
| mathjs isPrime | 0.32 ms | 0.33 ms | 20001 |
| big-integer isPrime | 18.39 ms | 20.25 ms | 20001 |

#### `modPow/large` — 2,000 iterations

| Implementation | Median | Max | Checksum |
| --- | ---: | ---: | ---: |
| number-theory powerMod | 3.12 ms | 4.56 ms | 892645665 |
| big-integer modPow | 1.80 ms | 1.98 ms | 892645665 |
| numwise modPow | **0.68 ms** | **0.76 ms** | 892645665 |

#### `primeFactors/semiprime` — 100 iterations

| Implementation | Median | Max | Checksum |
| --- | ---: | ---: | ---: |
| number-theory primeFactors | 1663.49 ms | 1713.27 ms | 2010008 |
| numwise primeFactors | **0.14 ms** | **0.17 ms** | 2010008 |

#### `primesUpTo/medium` — 20 iterations

| Implementation | Median | Max | Checksum |
| --- | ---: | ---: | ---: |
| numwise primesUpTo | **4.30 ms** | **4.37 ms** | 22026585 |
| number-theory sieve | 16.33 ms | 19.85 ms | 22026585 |

#### `gcd/small` — 30,000 iterations

| Implementation | Median | Max | Checksum |
| --- | ---: | ---: | ---: |
| numwise gcd | **0.60 ms** | **0.69 ms** | 1800006 |
| compute-gcd | 1.16 ms | 1.95 ms | 1800006 |
| mathjs gcd | 231.69 ms | 250.36 ms | 1800006 |
| number-theory gcd | **0.60 ms** | 0.75 ms | 1800006 |
| big-integer gcd | 9.60 ms | 10.27 ms | 1800006 |

#### `combination/context` — 10,000 iterations

| Implementation | Median | Max | Checksum |
| --- | ---: | ---: | ---: |
| numwise combination | **0.35 ms** | **0.35 ms** | 475784630 |

`big-integer` rows include conversion from Number inputs and conversion back;
`mathjs` rows include its normal numeric dispatch. See the benchmark guide for
the complete fairness and API-compatibility notes.

## What Numwise is NOT

Numwise is **not** a replacement for packages that provide advanced mathematical functions or symbolic computation. It focuses on high-performance numerical calculations.
