import { isPrime } from "./is_prime.js";

const TWO = 2n;
const THREE = 3n;
const FIVE = 5n;

/**
 * Returns the prime factors of a positive safe integer in ascending order,
 * including repeated factors.
 *
 * @throws {RangeError} If value is not a positive safe integer.
 */
export function primeFactors(value: number): number[] {
    if (!Number.isSafeInteger(value) || value < 1) {
        throw new RangeError(`primeFactors requires a positive safe integer, received ${value}`);
    }

    // Avoid allocating BigInt state and trial-dividing a large prime. The
    // primality test is already deterministic across the safe-integer range.
    if (value > 1_000_000 && isPrime(value)) {
        return [value];
    }

    let remaining = BigInt(value);
    const factors: bigint[] = [];

    for (const divisor of [TWO, THREE, FIVE]) {
        while (remaining % divisor === 0n) {
            factors.push(divisor);
            remaining /= divisor;
        }
    }

    const wheel = [4n, 2n, 4n, 2n, 4n, 6n, 2n, 6n] as const;
    let divisor = 7n;
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
    if (value === 1n) {
        return;
    }

    if (isPrime(Number(value))) {
        factors.push(value);
        return;
    }

    const divisor = pollardRho(value);
    factorRecursive(divisor, factors);
    factorRecursive(value / divisor, factors);
}

function pollardRho(value: bigint): bigint {
    for (let constant = 1n; ; constant++) {
        let x = 2n;
        let y = 2n;
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
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a;
}
