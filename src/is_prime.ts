import { MAX_NUMBER_MODULUS, modPowBig, modPowUnchecked } from "./mod_pow.js";

/** Small divisors worth testing before entering Miller-Rabin. */
const SMALL_PRIMES = [5, 7, 11, 13, 17] as const;
/** Trial division is cheaper than modular exponentiation for small values. */
const TRIAL_DIVISION_LIMIT = 200_000;
/** Deterministic Miller-Rabin witnesses for every safe integer. */
const WITNESSES = [2, 325, 9375, 28178, 450775, 9780504, 1795265022] as const;
/**
 * Deterministic bases for candidates below 341,550,071,728,321. Each tier is a
 * prefix of this array, so a count selects the smallest exact base set and
 * every witness lookup uses one array shape.
 */
const PREFIX_BASES = [2, 3, 5, 7, 11, 13, 17] as const;

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

    if (value <= TRIAL_DIVISION_LIMIT) {
        return isPrimeByWheel(value);
    }

    /** Decompose value - 1 as exponent * 2 ** powersOfTwo. */
    let exponent = value - 1;
    let powersOfTwo = 0;

    while (exponent % 2 === 0) {
        exponent /= 2;
        powersOfTwo++;
    }

    const baseCount = prefixBaseCountFor(value);
    const bases = baseCount === 0 ? WITNESSES : PREFIX_BASES;
    const count = baseCount === 0 ? WITNESSES.length : baseCount;

    return value > MAX_NUMBER_MODULUS
        ? millerRabinBig(value, exponent, powersOfTwo, bases, count)
        : millerRabinNumber(value, exponent, powersOfTwo, bases, count);
}

/**
 * Tests small candidates using the 6k +/- 1 divisor wheel.
 *
 * Divisors through 17 are checked by the caller, so this starts at 19.
 */
function isPrimeByWheel(value: number): boolean {
    for (let divisor = 19; divisor * divisor <= value; divisor += 6) {
        if (value % divisor === 0 || value % (divisor + 4) === 0) {
            return false;
        }
    }

    return true;
}

/**
 * Returns how many leading `PREFIX_BASES` entries are deterministic for a
 * candidate, or zero when the general witness set is required.
 *
 * @param value The candidate safe integer.
 */
function prefixBaseCountFor(value: number): number {
    if (value < 2_047) {
        return 1;
    }
    if (value < 1_373_653) {
        return 2;
    }
    if (value < 25_326_001) {
        return 3;
    }
    if (value < 3_215_031_751) {
        return 4;
    }
    if (value < 2_152_302_898_747) {
        return 5;
    }
    if (value < 3_474_749_660_383) {
        return 6;
    }
    if (value < 341_550_071_728_321) {
        return 7;
    }

    return 0;
}

/**
 * Runs Miller-Rabin with exact Number arithmetic for small candidates.
 *
 * @param value The candidate, no greater than the exact product bound.
 * @param exponent The odd part of value - 1.
 * @param powersOfTwo The power of two removed from value - 1.
 * @param bases The deterministic base array for this candidate.
 * @param count How many leading bases to apply.
 */
function millerRabinNumber(
    value: number,
    exponent: number,
    powersOfTwo: number,
    bases: readonly number[],
    count: number
): boolean {
    for (let index = 0; index < count; index++) {
        const witness = bases[index];
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
            result = (result * result) % value;
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

/**
 * Runs Miller-Rabin in BigInt for candidates whose squares overflow Number,
 * converting each operand once instead of once per modular multiplication.
 *
 * @param value The candidate above the exact product bound.
 * @param exponent The odd part of value - 1.
 * @param powersOfTwo The power of two removed from value - 1.
 * @param bases The deterministic base array for this candidate.
 * @param count How many leading bases to apply.
 */
function millerRabinBig(
    value: number,
    exponent: number,
    powersOfTwo: number,
    bases: readonly number[],
    count: number
): boolean {
    const modulus = BigInt(value);
    const bigExponent = BigInt(exponent);
    /** Residue that proves a witness inconclusive. */
    const minusOne = modulus - 1n;

    for (let index = 0; index < count; index++) {
        const witness = bases[index];
        if (witness >= value) {
            continue;
        }

        /** Modular witness result for the current Miller-Rabin round. */
        let result = modPowBig(BigInt(witness), bigExponent, modulus);
        if (result === 1n || result === minusOne) {
            continue;
        }

        /** Witness remains inconclusive if squaring reaches value - 1. */
        let probablyPrime = false;
        for (let round = 1; round < powersOfTwo; round++) {
            result = (result * result) % modulus;
            if (result === minusOne) {
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
