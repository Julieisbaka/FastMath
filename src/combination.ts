const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER;

/**
 * Returns the binomial coefficient n choose k exactly for safe-integer
 * results.
 *
 * @throws {RangeError} If n or k is invalid, k is greater than n, or the
 * result cannot be represented as a safe integer.
 */
export function combination(n: number, k: number): number {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(k) || n < 0 || k < 0 || k > n) {
        throw new RangeError(
            `combination requires safe integers with 0 <= k <= n, received ${n} and ${k}`
        );
    }

    k = Math.min(k, n - k);
    let result = 1;

    for (let factor = 1; factor <= k; factor++) {
        let numerator = n - k + factor;
        let denominator = factor;

        // Cancel before multiplying so safe final results do not overflow
        // because of an unnecessarily large intermediate product.
        let divisor = numerator;
        let remainder = denominator;
        while (remainder !== 0) {
            const next = divisor % remainder;
            divisor = remainder;
            remainder = next;
        }
        numerator /= divisor;
        denominator /= divisor;

        divisor = result;
        remainder = denominator;
        while (remainder !== 0) {
            const next = divisor % remainder;
            divisor = remainder;
            remainder = next;
        }
        result /= divisor;
        denominator /= divisor;

        const product = result * numerator;

        if (product > MAX_SAFE_INTEGER) {
            throw new RangeError("combination result exceeds Number.MAX_SAFE_INTEGER");
        }

        result = product / denominator;
    }

    return result;
}
