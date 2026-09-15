const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

/**
 * Returns the exact integer floor of the square root of a safe integer.
 *
 * @param value A non-negative safe integer.
 * @throws {RangeError} If value is negative, non-integral, unsafe, NaN, or infinite.
 */
export function integerSqrt(value: number): number {
    if (!Number.isSafeInteger(value) || value < 0) {
        throw new RangeError(
            `integerSqrt requires a non-negative safe integer, received ${value}`
        );
    }

    if (value < 2) {
        return value;
    }

    // Math.sqrt supplies an excellent initial estimate. The corrections make
    // the result exact while remaining safe: the root is at most 94,906,265,
    // whose square is within Number's exact-integer range.
    let root = Math.floor(Math.sqrt(value));

    while ((root + 1) * (root + 1) <= value) {
        root++;
    }

    while (root * root > value) {
        root--;
    }

    return root;
}

export { MAX_SAFE_INTEGER };
