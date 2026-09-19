import { integerSqrt } from "./integer_sqrt.js";

/**
 * Returns the exact integer floor of the n-th root of a non-negative safe
 * integer using integer Newton iteration.
 *
 * @param value The non-negative safe integer whose root is requested.
 * @param n The positive root degree.
 * @throws {RangeError} If value is negative or unsafe, or n is not a positive
 * safe integer.
 */
export function integerNthRoot(value: number, n: number): number {
    if (!Number.isSafeInteger(value) || value < 0) {
        throw new RangeError(`integerNthRoot requires a non-negative safe integer, received ${value}`);
    }
    if (!Number.isSafeInteger(n) || n < 1) {
        throw new RangeError(`integerNthRoot requires a positive safe integer degree, received ${n}`);
    }

    if (value < 2 || n === 1) {
        return value;
    }

    if (n === 2) {
        return integerSqrt(value);
    }

    if (n === 3) {
        /** BigInt target used to correct the floating-point cube-root estimate. */
        const target = BigInt(value);
        /** Corrected integer cube-root estimate. */
        let root = BigInt(Math.floor(Math.cbrt(value)));
        while (comparePower(root + 1n, 3n, target) <= 0) {
            root++;
        }
        while (comparePower(root, 3n, target) > 0) {
            root--;
        }
        return Number(root);
    }

    /** Every supported value is below 2^53, so degree 53 or more has root 1. */
    if (n >= 53) {
        return 1;
    }

    /** BigInt target used for exact Newton and correction arithmetic. */
    const target = BigInt(value);
    /** BigInt degree used to keep the iteration exact. */
    const degree = BigInt(n);
    /** Initial power-of-two root estimate. */
    const initialBits = Math.max(1, Math.ceil(Math.log2(value) / n));
    /** Current Newton iterate. */
    let root = 1n << BigInt(initialBits);

    for (;;) {
        /** Bounded root^(degree - 1), used as Newton's denominator. */
        const denominator = boundedPower(root, degree - 1n, target);
        /** Next exact Newton iterate. */
        const next = ((degree - 1n) * root + target / denominator) / degree;
        if (next >= root) {
            break;
        }
        root = next;
    }

    while (comparePower(root, degree, target) > 0) {
        root--;
    }
    while (comparePower(root + 1n, degree, target) <= 0) {
        root++;
    }

    return Number(root);
}

function boundedPower(base: bigint, exponent: bigint, limit: bigint): bigint {
    /** Accumulated power, capped once it exceeds the supplied limit. */
    let result = 1n;
    for (let index = 0n; index < exponent; index++) {
        if (result > limit / base) {
            return limit + 1n;
        }
        result *= base;
    }
    return result;
}

function comparePower(base: bigint, exponent: bigint, target: bigint): number {
    /** Accumulated power used to compare against the target exactly. */
    if (exponent === 0n) {
        return target === 1n ? 0 : 1;
    }

    let result = 1n;
    for (let index = 0n; index < exponent; index++) {
        if (result > target / base) {
            return 1;
        }
        result *= base;
    }

    return result < target ? -1 : result > target ? 1 : 0;
}

