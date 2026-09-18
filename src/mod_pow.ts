const SAFE_INTEGER_MAX = Number.MAX_SAFE_INTEGER;

/**
 * Computes (base ** exponent) modulo modulus exactly for safe integers.
 *
 * @throws {RangeError} If base or exponent is not a safe integer, exponent is
 * negative, or modulus is not a positive safe integer.
 */
export function modPow(base: number, exponent: number, modulus: number): number {
    if (
        !Number.isSafeInteger(base) ||
        !Number.isSafeInteger(exponent) ||
        !Number.isSafeInteger(modulus) ||
        exponent < 0 ||
        modulus < 1
    ) {
        throw new RangeError(
            `modPow requires safe integers with exponent >= 0 and modulus >= 1, ` +
            `received ${base}, ${exponent}, and ${modulus}`
        );
    }

    return modPowUnchecked(base, exponent, modulus);
}

/**
 * Computes modular exponentiation for already validated safe integers.
 * Inputs may have any safe integer base, a non-negative exponent, and a
 * positive modulus.
 */
export function modPowUnchecked(
    base: number,
    exponent: number,
    modulus: number
): number {
    if (modulus === 1) {
        return 0;
    }

    let result = 1;
    base %= modulus;
    if (base < 0) {
        base += modulus;
    }

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = multiplyMod(result, base, modulus);
        }

        exponent = Math.floor(exponent / 2);
        if (exponent === 0) {
            break;
        }

        base = multiplyMod(base, base, modulus);
    }

    return result;
}

/**
 * Multiplies non-negative modular values exactly, using BigInt only when the
 * Number product would exceed the exact safe-integer range.
 */
export function multiplyMod(a: number, b: number, modulus: number): number {
    const product = a * b;

    if (product <= SAFE_INTEGER_MAX) {
        return product % modulus;
    }

    return Number((BigInt(a) * BigInt(b)) % BigInt(modulus));
}
