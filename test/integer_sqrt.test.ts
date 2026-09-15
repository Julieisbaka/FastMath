import { integerSqrt } from "../src/integer_sqrt.js";

const expectEqual = (actual: number, expected: number, label: string): void => {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${expected}, received ${actual}`);
    }
};

const expectRangeError = (value: number): void => {
    let threw = false;

    try {
        integerSqrt(value);
    } catch (error) {
        threw = error instanceof RangeError;
    }

    if (!threw) {
        throw new Error(`integerSqrt(${value}) should throw RangeError`);
    }
};

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
expectRangeError(-1);
expectRangeError(Number.MAX_SAFE_INTEGER + 1);
expectRangeError(1.5);
expectRangeError(Number.NaN);
expectRangeError(Number.POSITIVE_INFINITY);

// Accuracy regression: the result must always satisfy r² <= n < (r + 1)².
for (const value of [2, 3, 15, 35, 99, 1000, 123456789, Number.MAX_SAFE_INTEGER]) {
    const root = integerSqrt(value);
    if (!(root * root <= value && value < (root + 1) * (root + 1))) {
        throw new Error(`integerSqrt(${value}) returned an inaccurate root`);
    }
}

// Performance regression for repeated large safe-integer calculations.
for (let iteration = 0; iteration < 1000; iteration++) {
    integerSqrt(Number.MAX_SAFE_INTEGER - iteration);
}

console.log("integerSqrt tests passed");