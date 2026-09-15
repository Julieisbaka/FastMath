import { isPrime } from "../src/is_prime";

const expectPrime = (value: number, expected: boolean): void => {
    if (isPrime(value) !== expected) {
        throw new Error(`isPrime(${value}) returned the wrong result`);
    }
};

// False: an even composite and an odd composite with non-trivial factors.
expectPrime(100, false);
expectPrime(221, false);

// False bounds: below the lower bound and above the safe-integer upper bound.
expectPrime(1, false);
expectPrime(Number.MAX_SAFE_INTEGER + 1, false);

// True: small and large safe-integer primes.
expectPrime(2, true);
expectPrime(9007199254740881, true);

// Strong pseudoprimes for common weak Miller-Rabin witness sets.
expectPrime(2047, false);
expectPrime(3215031751, false);
expectPrime(341550071728321, false);

// Coprimes are not automatically prime.
expectPrime(35, false);
expectPrime(91, false);

const benchmarkStart = performance.now();
const benchmarkIterations = 1000;
for (let iteration = 0; iteration < benchmarkIterations; iteration++) {
    isPrime(9007199254740881);
}
const benchmarkElapsed = performance.now() - benchmarkStart;
const maxMilliseconds = 500;

if (benchmarkElapsed > maxMilliseconds) {
    throw new Error(
        `isPrime performance regression: ${benchmarkElapsed.toFixed(2)}ms ` +
        `for ${benchmarkIterations} checks (limit: ${maxMilliseconds}ms)`
    );
}

console.log(`isPrime tests passed; benchmark: ${benchmarkElapsed.toFixed(2)}ms`);
