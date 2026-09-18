import { gcd } from "../src/gcd.js";
import { isPrime } from "../src/is_prime.js";
import { lcm } from "../src/lcm.js";
import { modPow } from "../src/mod_pow.js";

interface BenchmarkCase {
    readonly name: string;
    readonly operation: () => unknown;
}

const cases: readonly BenchmarkCase[] = [
    { name: "gcd/small", operation: () => gcd(48, 18) },
    { name: "gcd/large", operation: () => gcd(Number.MAX_SAFE_INTEGER, 2_305_843_009_213_693) },
    { name: "gcd/prime-heavy", operation: () => gcd(982_451_653, 961_748_941) },
    { name: "gcd/composite-heavy", operation: () => gcd(987_654_312, 493_827_156) },
    { name: "lcm/small", operation: () => lcm(21, 6) },
    { name: "lcm/large", operation: () => lcm(94_906_265, 94_906_264) },
    { name: "lcm/prime-heavy", operation: () => lcm(1_000_003, 1_000_033) },
    { name: "lcm/composite-heavy", operation: () => lcm(987_654, 123_456) },
    { name: "modPow/small", operation: () => modPow(2, 10, 1_000) },
    { name: "modPow/large", operation: () => modPow(Number.MAX_SAFE_INTEGER - 2, 4_294_967_291, 9_000_000_000_000_001) },
    { name: "modPow/prime-heavy", operation: () => modPow(982_451_653, 1_000_003, 1_000_000_007) },
    { name: "modPow/composite-heavy", operation: () => modPow(987_654_321, 987_654_321, 1_000_000_000) },
    { name: "isPrime/small", operation: () => isPrime(97) },
    { name: "isPrime/large", operation: () => isPrime(9_007_199_254_740_881) },
    { name: "isPrime/prime-heavy", operation: () => isPrime(982_451_653) },
    { name: "isPrime/composite-heavy", operation: () => isPrime(987_654_321) }
];

const iterations = 10_000;
for (const benchmarkCase of cases) {
    const start = performance.now();
    for (let iteration = 0; iteration < iterations; iteration++) {
        benchmarkCase.operation();
    }
    const elapsed = performance.now() - start;
    console.log(`${benchmarkCase.name}: ${elapsed.toFixed(2)}ms (${iterations} iterations)`);
}
