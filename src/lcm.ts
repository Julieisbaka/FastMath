import { gcd } from "./gcd.js";

const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

/**
 * Returns the least common multiple of two safe integers.
 *
 * The result is always non-negative. `lcm(0, 0)` and `lcm(0, n)` return `0`.
 *
 * @throws {RangeError} If either argument is not a safe integer or the result
 * exceeds Number.MAX_SAFE_INTEGER.
 */
export function lcm(a: number, b: number): number {
    if (!Number.isSafeInteger(a) || !Number.isSafeInteger(b)) {
        throw new RangeError(
            `lcm requires safe integers, received ${a} and ${b}`
        );
    }

    if (a === 0 || b === 0) {
        return 0;
    }

    a = Math.abs(a);
    b = Math.abs(b);

    // These common cases avoid the Euclidean algorithm entirely.
    if (a === b || a === 1) {
        return b;
    }

    if (b === 1) {
        return a;
    }

    const divisor = gcd(a, b);
    const result = (a / divisor) * b;

    if (result > MAX_SAFE_INTEGER) {
        throw new RangeError("lcm result exceeds Number.MAX_SAFE_INTEGER");
    }

    return result;
}
