import { integerNthRoot } from "../src/integer_nth_root.js";
import { expectEqual, expectPerformance, expectRangeError } from "./helpers.js";

expectEqual(integerNthRoot(0, 3), 0, "zero root");
expectEqual(integerNthRoot(1, 99), 1, "unit root");
expectEqual(integerNthRoot(64, 3), 4, "perfect cube");
expectEqual(integerNthRoot(65, 3), 4, "floored cube root");
expectEqual(integerNthRoot(Number.MAX_SAFE_INTEGER, 2), 94_906_265, "large square root");
expectEqual(integerNthRoot(Number.MAX_SAFE_INTEGER, 3), 208_063, "large cube root");

for (const [value, degree] of [[2, 2], [15, 2], [80, 3], [999, 4]] as const) {
    const root = integerNthRoot(value, degree);
    if (!(root ** degree <= value && (root + 1) ** degree > value)) {
        throw new Error(`integerNthRoot(${value}, ${degree}) violated its invariant`);
    }
}

expectRangeError(integerNthRoot, -1, 2);
expectRangeError(integerNthRoot, 8, 0);
expectRangeError(integerNthRoot, 8, 1.5);
expectRangeError(integerNthRoot, Number.NaN, 2);
expectRangeError(integerNthRoot, 8, Number.POSITIVE_INFINITY);
expectRangeError(integerNthRoot, Number.MAX_SAFE_INTEGER + 1, 2);

expectPerformance(() => integerNthRoot(Number.MAX_SAFE_INTEGER, 3), 100_000, 1000, "integerNthRoot");

console.log("integerNthRoot tests passed");
