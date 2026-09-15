const SAFE_INTEGER_MAX = Number.MAX_SAFE_INTEGER;
const WITNESSES = [2, 3, 5, 7, 11, 13, 17] as const;

function multiplyMod(a: number, b: number, modulus: number): number {
    const product = a * b;

    if (product <= SAFE_INTEGER_MAX) {
        return product % modulus;
    }

    const high = Math.floor(a / 0x200000000);
    const low = a - high * 0x200000000;
    return (high * b * 0x200000000 + low * b) % modulus;
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

    for (const witness of WITNESSES) {
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
