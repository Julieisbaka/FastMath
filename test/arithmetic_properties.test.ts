import { combination } from "../src/combination.js";
import { gcd } from "../src/gcd.js";
import { isPrime } from "../src/is_prime.js";
import { lcm } from "../src/lcm.js";
import { modPow } from "../src/mod_pow.js";
import { expectEqual } from "./helpers.js";

const bigintGcd = (a: bigint, b: bigint): bigint => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b !== 0n) {
        [a, b] = [b, a % b];
    }
    return a;
};

const bigintIsPrime = (value: bigint): boolean => {
    if (value < 2n) {
        return false;
    }
    for (let divisor = 2n; divisor * divisor <= value; divisor++) {
        if (value % divisor === 0n) {
            return value === divisor;
        }
    }
    return true;
};

const bigintCombination = (n: bigint, k: bigint): bigint => {
    k = k < n - k ? k : n - k;
    let result = 1n;
    for (let factor = 1n; factor <= k; factor++) {
        result = (result * (n - k + factor)) / factor;
    }
    return result;
};

const bigintModPow = (base: bigint, exponent: bigint, modulus: bigint): bigint => {
    let result = 1n % modulus;
    base = ((base % modulus) + modulus) % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        base = (base * base) % modulus;
        exponent /= 2n;
    }
    return result;
};

let state = 0x12345678;
const nextValue = (limit: number): number => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state % limit;
};

const expectBoolean = (actual: boolean, expected: boolean, label: string): void => {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${expected}, received ${actual}`);
    }
};

for (let iteration = 0; iteration < 500; iteration++) {
    const a = nextValue(2_000_001) - 1_000_000;
    const b = nextValue(2_000_001) - 1_000_000;
    expectEqual(gcd(a, b), Number(bigintGcd(BigInt(a), BigInt(b))), "gcd property");

    const smallA = nextValue(10_001) - 5_000;
    const smallB = nextValue(10_001) - 5_000;
    const expectedLcm = smallA === 0 || smallB === 0
        ? 0n
        : (BigInt(Math.abs(smallA)) / bigintGcd(BigInt(smallA), BigInt(smallB))) * BigInt(Math.abs(smallB));
    expectEqual(lcm(smallA, smallB), Number(expectedLcm), "lcm property");

    const base = nextValue(2_000_001) - 1_000_000;
    const exponent = nextValue(100_000);
    const modulus = nextValue(100_000) + 1;
    const expectedPow = bigintModPow(BigInt(base), BigInt(exponent), BigInt(modulus));
    expectEqual(modPow(base, exponent, modulus), Number(expectedPow), "modPow property");

    const n = nextValue(31);
    const k = nextValue(n + 1);
    expectEqual(combination(n, k), Number(bigintCombination(BigInt(n), BigInt(k))), "combination property");

    const primeCandidate = nextValue(100_000);
    expectBoolean(isPrime(primeCandidate), bigintIsPrime(BigInt(primeCandidate)), "isPrime property");
}

console.log("arithmetic property tests passed");
