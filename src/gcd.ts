/**
 * Returns the greatest common divisor of two safe integers.
 *
 * The result is always non-negative. `gcd(0, 0)` returns `0`.
 *
 * @param a The first safe integer.
 * @param b The second safe integer.
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
 *
 * @param a The first non-negative safe integer.
 * @param b The second non-negative safe integer.
 */
export function gcdUnchecked(a: number, b: number): number {
    if (a === 0) {
        return b;
    }

    if (b === 0 || a === b) {
        return a;
    }

    if (a < b) {
        /** Swapped once so the first modulo uses the larger dividend. */
        const smaller = a;
        a = b;
        b = smaller;
    }

    while (b !== 0) {
        /** Remainder, always strictly smaller than the current divisor. */
        const remainder = a % b;
        a = b;
        b = remainder;
    }

    return a;
}

