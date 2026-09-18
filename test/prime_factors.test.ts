import { primeFactors } from "../src/prime_factors.js";
import { expectEqual, expectPerformance, expectRangeError } from "./helpers.js";

const expectString = (actual: string, expected: string, label: string): void => {
	if (actual !== expected) {
		throw new Error(`${label}: expected ${expected}, received ${actual}`);
	}
};

expectString(primeFactors(1).join(","), "", "one has no prime factors");
expectString(primeFactors(360).join(","), "2,2,2,3,3,5", "repeated factors");
expectString(primeFactors(97).join(","), "97", "prime input");
expectString(primeFactors(1_000_003 * 1_000_033).join(","), "1000003,1000033", "Pollard Rho semiprime");
expectRangeError(primeFactors, 0);
expectRangeError(primeFactors, -1);
expectRangeError(primeFactors, 1.5);
expectRangeError(primeFactors, Number.NaN);
expectRangeError(primeFactors, Number.MAX_SAFE_INTEGER + 1);

expectPerformance(() => primeFactors(1_000_003 * 1_000_033), 100, 1000, "primeFactors");

console.log("primeFactors tests passed");
