const SAFE_INTEGER_MAX = Number.MAX_SAFE_INTEGER;
const SMALL_PRIMES = [2, 3, 5, 7, 11, 13, 17] as const;
const WITNESSES = [2, 325, 9375, 28178, 450775, 9780504, 1795265022] as const;

function multiplyMod(a: number, b: number, modulus: number): number {
    const product = a * b;

    if (product <= SAFE_INTEGER_MAX) {
        return product % modulus;
    }

    // Number multiplication is no longer exact here. BigInt is used only
    // for this overflow path so the common small-product path stays fast.
    return Number((BigInt(a) * BigInt(b)) % BigInt(modulus));
}

function powerMod(base: number, exponent: number, modulus: number): number {
    let result = 1;
    base %= modulus;

    while (exponent > 0) {
        if (exponent & 1) {
            result = multiplyMod(result, base, modulus);
        }

        base = multiplyMod(base, base, modulus);
        exponent = Math.floor(exponent / 2);
    }

    return result;
}

/**
 * Tests whether a safe integer is prime using deterministic Miller-Rabin.
 * The fixed witness set makes this exact for Number safe integers; it is not
 * a probabilistic test in this supported range.
 */
export function isPrime(value: number): boolean {
    if (!Number.isSafeInteger(value) || value < 2) {
        return false;
    }

    if (value === 2 || value === 3) {
        return true;
    }

    for (const witness of SMALL_PRIMES) {
        if (value % witness === 0) {
            return value === witness;
        }
    }

    let exponent = value - 1;
    let powersOfTwo = 0;

    while ((exponent & 1) === 0) {
        exponent /= 2;
        powersOfTwo++;
    }

    for (const witness of WITNESSES) {
        if (witness >= value) {
            continue;
        }

        let result = powerMod(witness, exponent, value);
        if (result === 1 || result === value - 1) {
            continue;
        }

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
