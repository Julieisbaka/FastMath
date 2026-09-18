import { gcdUnchecked } from "./gcd.js";

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

/**
 * Returns the least common multiple of a collection of safe integers.
 * The empty collection has the multiplicative identity `1`; any zero input
 * makes the result `0`.
 *
 * @throws {RangeError} If an input is not a safe integer or the exact result
 * exceeds Number.MAX_SAFE_INTEGER.
 */
export function lcmMany(values: readonly number[]): number {
    for (const value of values) {
        if (!Number.isSafeInteger(value)) {
            throw new RangeError(`lcmMany requires safe integers, received ${value}`);
        }
    }

    let result = 1;
    for (const value of values) {
        if (value === 0) {
            return 0;
        }

        const absoluteValue = Math.abs(value);
        const divisor = gcdUnchecked(result, absoluteValue);
        const next = (result / divisor) * absoluteValue;
        if (next > MAX_SAFE_INTEGER) {
            throw new RangeError("lcmMany result exceeds Number.MAX_SAFE_INTEGER");
        }
        result = next;
    }

    return result;
}
