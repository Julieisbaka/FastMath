import { runTestFiles } from "./helpers.js";

await runTestFiles(
    "./is_prime.test.js",
    "./integer_sqrt.test.js",
    "./gcd.test.js",
    "./combination.test.js",
    "./lcm.test.js",
    "./permutation.test.js"
);

console.log("All tests passed");
