const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

/**
 * Returns the greatest common divisor of two safe integers.
 *
 * The result is always non-negative. `gcd(0, 0)` returns `0`.
 *
 * @throws {RangeError} If either argument is not a safe integer.
 */
export function gcd(a: number, b: number): number {
    if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b)) {
        throw new RangeError(
            `gcd requires safe integers, received ${a} and ${b}`
        );
    }

    return gcdUnchecked(Math.abs(a), Math.abs(b));
}

/**
 * Computes the GCD of non-negative safe integers without repeating validation.
 * This is shared by functions that have already validated their arguments.
 */
export function gcdUnchecked(a: number, b: number): number {
    if (a === 0) {
        return b;
    }

    if (b === 0 || a === b) {
        return a;
    }

    if (a < b) {
        const smaller = a;
        a = b;
        b = smaller;
    }

    while (b !== 0) {
        const remainder = a % b;
        a = b;
        b = remainder;
    }

    return a;
}

export { MAX_SAFE_INTEGER };
