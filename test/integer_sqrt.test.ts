import { integerSqrt } from "../src/integer_sqrt.js";
import { expectEqual, expectPerformance, expectRangeError } from "./helpers.js";

// Basic values and exact squares.
expectEqual(integerSqrt(0), 0, "zero");
expectEqual(integerSqrt(1), 1, "one");
expectEqual(integerSqrt(4), 2, "four");
expectEqual(integerSqrt(81), 9, "eighty-one");

// Values immediately below and above squares must be floored exactly.
expectEqual(integerSqrt(24), 4, "below twenty-five");
expectEqual(integerSqrt(25), 5, "twenty-five");
expectEqual(integerSqrt(26), 5, "above twenty-five");
const largeRoot = 94806264;
expectEqual(integerSqrt(largeRoot * largeRoot), largeRoot, "large exact square");
expectEqual(integerSqrt(Number.MAX_SAFE_INTEGER), 94906265, "maximum safe integer");

// Invalid bounds and invalid numeric categories.
expectRangeError(integerSqrt, -1);
expectRangeError(integerSqrt, Number.MAX_SAFE_INTEGER + 1);
expectRangeError(integerSqrt, 1.5);
expectRangeError(integerSqrt, Number.NaN);
expectRangeError(integerSqrt, Number.POSITIVE_INFINITY);

// Accuracy regression: the result must always satisfy r² <= n < (r + 1)².
for (const value of [2, 3, 15, 35, 99, 1000, 123456789, Number.MAX_SAFE_INTEGER]) {
    const root = integerSqrt(value);
    if (!(root * root <= value && value < (root + 1) * (root + 1))) {
        throw new Error(`integerSqrt(${value}) returned an inaccurate root`);
    }
}

// Performance regression for repeated large safe-integer calculations.
expectPerformance(
    () => integerSqrt(Number.MAX_SAFE_INTEGER),
    1000,
    500,
    "integerSqrt"
);

console.log("integerSqrt tests passed");