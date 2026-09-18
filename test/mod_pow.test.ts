import { modPow } from "../src/mod_pow.js";
import { expectEqual, expectPerformance, expectRangeError } from "./helpers.js";

expectEqual(modPow(2, 10, 1000), 24, "small exponent");
expectEqual(modPow(3, 0, 7), 1, "zero exponent");
expectEqual(modPow(-2, 3, 5), 2, "negative base");
expectEqual(modPow(2, 32, 1_000_000_007), 294967268, "large modulus");
expectEqual(modPow(2, 4_294_967_297, 7), 4, "large safe exponent");
expectEqual(modPow(123, 456, 1), 0, "unit modulus");

expectRangeError(modPow, 1.5, 2, 3);
expectRangeError(modPow, 2, -1, 3);
expectRangeError(modPow, 2, 2, 0);
expectRangeError(modPow, Number.NaN, 2, 3);
expectRangeError(modPow, 2, Number.POSITIVE_INFINITY, 3);
expectRangeError(modPow, 2, 2, Number.MAX_SAFE_INTEGER + 1);

expectPerformance(
    () => modPow(123456789, 987654321, 1_000_000_007),
    100_000,
    1000,
    "modPow"
);

console.log("modPow tests passed");
