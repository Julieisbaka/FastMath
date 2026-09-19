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

    /** Native sqrt supplies an estimate; exact integer checks correct it. */
    let root = Math.floor(Math.sqrt(value));

    while ((root + 1) * (root + 1) <= value) {
        root++;
    }

    while (root * root > value) {
        root--;
    }

    return root;
}

