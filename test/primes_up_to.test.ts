import { primesUpTo } from "../src/primes_up_to.js";
import { expectEqual, expectPerformance, expectRangeError } from "./helpers.js";

const expectString = (actual: string, expected: string, label: string): void => {
	if (actual !== expected) {
		throw new Error(`${label}: expected ${expected}, received ${actual}`);
	}
};

expectEqual(primesUpTo(0).length, 0, "no primes below two");
expectString(primesUpTo(2).join(","), "2", "first prime");
expectString(primesUpTo(30).join(","), "2,3,5,7,11,13,17,19,23,29", "small sieve");
expectEqual(primesUpTo(100)[primesUpTo(100).length - 1], 97, "last prime");
expectRangeError(primesUpTo, -1);
expectRangeError(primesUpTo, 1.5);
expectRangeError(primesUpTo, Number.NaN);
expectRangeError(primesUpTo, Number.MAX_SAFE_INTEGER);

expectPerformance(() => primesUpTo(100_000), 100, 500, "primesUpTo");

console.log("primesUpTo tests passed");
