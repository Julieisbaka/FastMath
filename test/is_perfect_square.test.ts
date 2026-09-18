import { isPerfectSquare } from "../src/is_perfect_square.js";
import { expectPerformance, expectRangeError } from "./helpers.js";

const expectBoolean = (actual: boolean, expected: boolean, label: string): void => {
	if (actual !== expected) {
		throw new Error(`${label}: expected ${expected}, received ${actual}`);
	}
};

expectBoolean(isPerfectSquare(0), true, "zero square");
expectBoolean(isPerfectSquare(1), true, "unit square");
expectBoolean(isPerfectSquare(144), true, "perfect square");
expectBoolean(isPerfectSquare(145), false, "non-square");
expectBoolean(isPerfectSquare(Number.MAX_SAFE_INTEGER), false, "safe boundary");
expectRangeError(isPerfectSquare, -1);
expectRangeError(isPerfectSquare, 1.5);
expectRangeError(isPerfectSquare, Number.NaN);
expectRangeError(isPerfectSquare, Number.POSITIVE_INFINITY);
expectRangeError(isPerfectSquare, Number.MAX_SAFE_INTEGER + 1);

expectPerformance(() => isPerfectSquare(Number.MAX_SAFE_INTEGER), 100_000, 1000, "isPerfectSquare");

console.log("isPerfectSquare tests passed");
