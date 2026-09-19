import { integerSqrt } from "./integer_sqrt.js";

/**
 * Returns whether a non-negative safe integer is a perfect square.
 *
 * @param value The non-negative safe integer to test.
 * @throws {RangeError} If value is negative, unsafe, non-integral, NaN, or
 * infinite.
 */
export function isPerfectSquare(value: number): boolean {
    const root = integerSqrt(value);
    return root * root === value;
}
