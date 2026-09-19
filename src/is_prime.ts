import { modPowUnchecked, multiplyMod } from "./mod_pow.js";

/** Small divisors worth testing before entering Miller-Rabin. */
const SMALL_PRIMES = [5, 7, 11, 13, 17] as const;
/** Deterministic Miller-Rabin witnesses for every safe integer. */
const WITNESSES = [2, 325, 9375, 28178, 450775, 9780504, 1795265022] as const;

/**
 * Tests whether a safe integer is prime using deterministic Miller-Rabin.
 * The fixed witness set makes this exact for Number safe integers; it is not
 * a probabilistic test in this supported range.
 *
 * @param value The candidate safe integer.
 */
export function isPrime(value: number): boolean {
    if (!Number.isSafeInteger(value) || value < 2) {
        return false;
    }

    if (value === 2 || value === 3) {
        return true;
    }

    if (value % 2 === 0) {
        return false;
    }

    if (value % 3 === 0) {
        return false;
    }

    for (const witness of SMALL_PRIMES) {
        if (value % witness === 0) {
            return value === witness;
        }
    }

    /** Decompose value - 1 as exponent * 2 ** powersOfTwo. */
    let exponent = value - 1;
    let powersOfTwo = 0;

    while (exponent % 2 === 0) {
        exponent /= 2;
        powersOfTwo++;
    }

    for (const witness of WITNESSES) {
        if (witness >= value) {
            continue;
        }

        /** Modular witness result for the current Miller-Rabin round. */
        let result = modPowUnchecked(witness, exponent, value);
        if (result === 1 || result === value - 1) {
            continue;
        }

        /** Witness remains inconclusive if squaring reaches value - 1. */
        let probablyPrime = false;
        for (let round = 1; round < powersOfTwo; round++) {
            result = multiplyMod(result, result, value);
            if (result === value - 1) {
                probablyPrime = true;
                break;
            }
        }

        if (!probablyPrime) {
            return false;
        }
    }

    return true;
}
