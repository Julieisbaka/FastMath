const MAX_SIEVE_LIMIT = 100_000_000;
const SEGMENT_SIZE = 32_768;

/**
 * Returns all prime numbers less than or equal to a non-negative limit.
 *
 * @throws {RangeError} If the limit is negative, unsafe, non-integral, or too
 * large to produce a practical in-memory result.
 */
export function primesUpTo(limit: number): number[] {
    if (!Number.isSafeInteger(limit) || limit < 0 || limit > MAX_SIEVE_LIMIT) {
        throw new RangeError(
            `primesUpTo requires a safe integer from 0 through ${MAX_SIEVE_LIMIT}, received ${limit}`
        );
    }

    if (limit < 2) {
        return [];
    }

    const baseLimit = Math.floor(Math.sqrt(limit));
    const basePrimes = [2, ...oddSieve(baseLimit)];
    const primes: number[] = [2];

    for (let segmentStart = 3; segmentStart <= limit; segmentStart += SEGMENT_SIZE) {
        const segmentEnd = Math.min(limit, segmentStart + SEGMENT_SIZE - 1);
        const segment = new Uint8Array(segmentEnd - segmentStart + 1);
        segment.fill(1);

        for (const prime of basePrimes) {
            if (prime * prime > segmentEnd) {
                break;
            }

            let multiple = Math.max(prime * prime, Math.ceil(segmentStart / prime) * prime);
            for (; multiple <= segmentEnd; multiple += prime) {
                segment[multiple - segmentStart] = 0;
            }
        }

        for (let value = segmentStart; value <= segmentEnd; value++) {
            if (segment[value - segmentStart] !== 0) {
                primes.push(value);
            }
        }
    }

    return primes;
}

function oddSieve(limit: number): number[] {
    if (limit < 3) {
        return [];
    }

    const composite = new Uint8Array(Math.floor((limit - 1) / 2));
    const primes: number[] = [];

    for (let index = 0; index < composite.length; index++) {
        if (composite[index] !== 0) {
            continue;
        }

        const prime = index * 2 + 3;
        primes.push(prime);
        if (prime * prime > limit) {
            continue;
        }

        for (let multiple = (prime * prime - 3) / 2; multiple < composite.length; multiple += prime) {
            composite[multiple] = 1;
        }
    }

    return primes;
}
