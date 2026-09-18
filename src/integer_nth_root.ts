/**
 * Returns the exact integer floor of the n-th root of a non-negative safe
 * integer using integer Newton iteration.
 *
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

    const target = BigInt(value);
    const degree = BigInt(n);
    const initialBits = Math.max(1, Math.ceil(Math.log2(value) / n));
    let root = 1n << BigInt(initialBits);

    for (;;) {
        const denominator = boundedPower(root, degree - 1n, target);
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

