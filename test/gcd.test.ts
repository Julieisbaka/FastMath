import { gcd } from "../src/gcd.js";

const expectEqual = (actual: number, expected: number, label: string): void => {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${expected}, received ${actual}`);
    }
};

const expectRangeError = (a: number, b: number): void => {
    let threw = false;

    try {
        gcd(a, b);
    } catch (error) {
        threw = error instanceof RangeError;
    }

    if (!threw) {
        throw new Error(`gcd(${a}, ${b}) should throw RangeError`);
    }
};

expectEqual(gcd(48, 18), 6, "common factors");
expectEqual(gcd(17, 13), 1, "coprime values");
expectEqual(gcd(0, 24), 24, "zero first argument");
expectEqual(gcd(24, 0), 24, "zero second argument");
expectEqual(gcd(0, 0), 0, "both arguments zero");
expectEqual(gcd(-48, 18), 6, "negative first argument");
expectEqual(gcd(48, -18), 6, "negative second argument");
expectEqual(gcd(-48, -18), 6, "both arguments negative");
expectEqual(gcd(Number.MAX_SAFE_INTEGER, 0), Number.MAX_SAFE_INTEGER, "safe boundary");

expectRangeError(1.5, 3);
expectRangeError(Number.NaN, 3);
expectRangeError(Number.POSITIVE_INFINITY, 3);
expectRangeError(Number.MAX_SAFE_INTEGER + 1, 3);
expectRangeError(3, Number.MAX_SAFE_INTEGER + 1);

for (let iteration = 0; iteration < 100_000; iteration++) {
    gcd(987654321, 123456789);
}

console.log("gcd tests passed");
