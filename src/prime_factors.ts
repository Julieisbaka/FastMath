import { isPrime } from "./is_prime.js";

/** Small factors removed before the wheel trial-division pass. */
const TWO = 2n;
/** Small factors removed before the wheel trial-division pass. */
const THREE = 3n;
/** Small factors removed before the wheel trial-division pass. */
const FIVE = 5n;

/**
 * Returns the prime factors of a positive safe integer in ascending order,
 * including repeated factors.
 *
 * @param value The positive safe integer to factor.
 * @throws {RangeError} If value is not a positive safe integer.
 */
export function primeFactors(value: number): number[] {
    if (!Number.isSafeInteger(value) || value < 1) {
        throw new RangeError(`primeFactors requires a positive safe integer, received ${value}`);
    }

    /** Large primes return directly after deterministic primality testing. */
    if (value > 1_000_000 && isPrime(value)) {
        return [value];
    }

    /** BigInt state keeps trial division and Pollard Rho exact for safe inputs. */
    let remaining = BigInt(value);
    /** Factors accumulated before and after recursive cofactor splitting. */
    const factors: bigint[] = [];

    /** Remove the smallest prime factor and all of its repetitions. */
    while (remaining % TWO === 0n) {
        factors.push(TWO);
        remaining /= TWO;
    }
    /** Remove the next smallest prime factor and all of its repetitions. */
    while (remaining % THREE === 0n) {
        factors.push(THREE);
        remaining /= THREE;
    }
    /** Remove the next smallest prime factor and all of its repetitions. */
    while (remaining % FIVE === 0n) {
        factors.push(FIVE);
        remaining /= FIVE;
    }

    /** Candidate increments visit integers coprime to 2, 3, and 5. */
    const wheel = [4n, 2n, 4n, 2n, 4n, 6n, 2n, 6n] as const;
    /** Current wheel candidate used for trial division. */
    let divisor = 7n;
    /** Index of the next increment in the 30-wheel cycle. */
    let wheelIndex = 0;
    while (divisor * divisor <= remaining && divisor <= 1_000n) {
        while (remaining % divisor === 0n) {
            factors.push(divisor);
            remaining /= divisor;
        }
        divisor += wheel[wheelIndex];
        wheelIndex = (wheelIndex + 1) % wheel.length;
    }

    if (remaining > 1n) {
        factorRecursive(remaining, factors);
    }

    factors.sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
    return factors.map(Number);
}

function factorRecursive(value: bigint, factors: bigint[]): void {
    /** Split composite cofactors until every leaf is prime. */
    if (value === 1n) {
        return;
    }

    if (isPrime(Number(value))) {
        factors.push(value);
        return;
    }

    /** Non-trivial divisor returned by Pollard Rho. */
    const divisor = pollardRho(value);
    factorRecursive(divisor, factors);
    factorRecursive(value / divisor, factors);
}

function pollardRho(value: bigint): bigint {
    /** Retry with a new polynomial constant if a cycle returns the input. */
    for (let constant = 1n; ; constant++) {
        /** Tortoise state in Pollard Rho's cycle walk. */
        let x = 2n;
        /** Hare state in Pollard Rho's cycle walk. */
        let y = 2n;
        /** Current GCD candidate; `1` means no factor found yet. */
        let divisor = 1n;

        for (let iteration = 0; iteration < 100_000 && divisor === 1n; iteration++) {
            x = (x * x + constant) % value;
            y = (y * y + constant) % value;
            y = (y * y + constant) % value;
            divisor = bigintGcd(x >= y ? x - y : y - x, value);
        }

        if (divisor > 1n && divisor < value) {
            return divisor;
        }
    }
}

function bigintGcd(a: bigint, b: bigint): bigint {
    /** Euclid's algorithm for exact BigInt differences and cofactors. */
    while (b !== 0n) {
        /** Remainder from the current Euclidean reduction step. */
        const remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}
