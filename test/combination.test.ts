import { combination } from "../src/combination.js";

const expectEqual = (actual: number, expected: number, label: string): void => {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${expected}, received ${actual}`);
    }
};

const expectRangeError = (n: number, k: number): void => {
    let threw = false;

    try {
        combination(n, k);
    } catch (error) {
        threw = error instanceof RangeError;
    }

    if (!threw) {
        throw new Error(`combination(${n}, ${k}) should throw RangeError`);
    }
};

expectEqual(combination(5, 0), 1, "k equals zero");
expectEqual(combination(5, 5), 1, "k equals n");
expectEqual(combination(5, 2), 10, "small combination");
expectEqual(combination(10, 5), 252, "central combination");
expectEqual(combination(52, 5), 2598960, "card-hand combination");
expectEqual(combination(30, 27), combination(30, 3), "symmetry");
expectEqual(combination(66, 33), 721942843401626, "largest tested safe result");

expectRangeError(-1, 0);
expectRangeError(5, -1);
expectRangeError(4, 5);
expectRangeError(1.5, 1);
expectRangeError(Number.NaN, 1);
expectRangeError(Number.POSITIVE_INFINITY, 1);
expectRangeError(Number.MAX_SAFE_INTEGER + 1, 1);
expectRangeError(67, 33);

for (let iteration = 0; iteration < 100_000; iteration++) {
    combination(30, 15);
}

console.log("combination tests passed");
