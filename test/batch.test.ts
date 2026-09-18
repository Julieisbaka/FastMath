import { gcdMany } from "../src/gcd_many.js";
import { lcmMany } from "../src/lcm_many.js";
import { expectEqual, expectPerformance, expectRangeError } from "./helpers.js";

expectEqual(gcdMany([]), 0, "empty gcd identity");
expectEqual(gcdMany([84, -126, 210]), 42, "batch gcd");
expectEqual(gcdMany([15, 28, 121]), 1, "gcd early exit");
expectEqual(gcdMany([0, 0]), 0, "zero gcd");
expectRangeError(() => gcdMany([1.5]));

expectEqual(lcmMany([]), 1, "empty lcm identity");
expectEqual(lcmMany([4, -6, 10]), 60, "batch lcm");
expectEqual(lcmMany([0, 12, 18]), 0, "zero lcm");
expectRangeError(() => lcmMany([1.5]));
expectRangeError(() => lcmMany([Number.MAX_SAFE_INTEGER, 2]));

expectPerformance(() => gcdMany([987654321, 123456789, 42, 1]), 100_000, 500, "gcdMany");
expectPerformance(() => lcmMany([6, 10, 15, 1]), 100_000, 500, "lcmMany");

console.log("batch tests passed");
