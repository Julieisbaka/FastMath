/**
 * Returns the greatest common divisor of a non-empty collection of safe integers.
 * The empty collection has the additive identity `0`.
 *
 * @param values The values to combine; an empty collection returns `0`.
 * @throws {RangeError} If any value is not a safe integer.
 */
export function gcdMany(values: readonly number[]): number {
    /** Additive identity used to seed the running GCD. */
    let result = 0;

    for (const value of values) {
        if (!Number.isSafeInteger(value)) {
            throw new RangeError(`gcdMany requires safe integers, received ${value}`);
        }

        result = gcdNonNegative(result, Math.abs(value));
        if (result === 1) {
            for (const remaining of values) {
                if (!Number.isSafeInteger(remaining)) {
                    throw new RangeError(`gcdMany requires safe integers, received ${remaining}`);
                }
            }
            return 1;
        }
    }

    return result;
}

function gcdNonNegative(a: number, b: number): number {
    /** Both inputs are non-negative and validated by the caller. */
    while (b !== 0) {
        /** Remainder in the Euclidean reduction. */
        const remainder = a % b;
        a = b;
        b = remainder;
    }
    return a;
}
