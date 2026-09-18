import { runTestFiles } from "./helpers.js";

await runTestFiles(
    "./is_prime.test.js",
    "./integer_sqrt.test.js",
    "./gcd.test.js",
    "./combination.test.js",
    "./lcm.test.js",
    "./permutation.test.js",
    "./mod_pow.test.js",
    "./arithmetic_properties.test.js",
    "./batch.test.js",
    "./primes_up_to.test.js",
    "./prime_factors.test.js",
    "./integer_nth_root.test.js",
    "./is_perfect_square.test.js"
);

console.log("All tests passed");
