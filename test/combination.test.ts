import { combination } from "../src/combination.js";
import { expectEqual, expectPerformance, expectRangeError } from "./helpers.js";

expectEqual(combination(5, 0), 1, "k equals zero");
expectEqual(combination(5, 5), 1, "k equals n");
expectEqual(combination(5, 2), 10, "small combination");
expectEqual(combination(10, 5), 252, "central combination");
expectEqual(combination(52, 5), 2598960, "card-hand combination");
expectEqual(combination(30, 27), combination(30, 3), "symmetry");
expectEqual(combination(56, 28), 7648690600760440, "largest tested safe result");

expectRangeError(combination, -1, 0);
expectRangeError(combination, 5, -1);
expectRangeError(combination, 4, 5);
expectRangeError(combination, 1.5, 1);
expectRangeError(combination, Number.NaN, 1);
expectRangeError(combination, Number.POSITIVE_INFINITY, 1);
expectRangeError(combination, Number.MAX_SAFE_INTEGER + 1, 1);
expectRangeError(combination, 67, 33);

expectPerformance(() => combination(30, 15), 100_000, 500, "combination");

console.log("combination tests passed");
