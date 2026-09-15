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

    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
        const remainder = a % b;
        a = b;
        b = remainder;
    }

    return a;
}

export { MAX_SAFE_INTEGER };
