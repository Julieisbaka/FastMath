export function expectEqual(
    actual: number,
    expected: number,
    label: string
): void {
    if (actual !== expected) {
        throw new Error(`${label}: expected ${expected}, received ${actual}`);
    }
}

export function expectRangeError(
    operation: (...args: number[]) => unknown,
    ...args: number[]
): void {
    let threw = false;

    try {
        operation(...args);
    } catch (error) {
        threw = error instanceof RangeError;
    }

    if (!threw) {
        throw new Error(`${operation.name}(${args.join(", ")}) should throw RangeError`);
    }
}

export function expectPerformance(
    operation: () => unknown,
    iterations: number,
    maxMilliseconds: number,
    label: string
): number {
    const start = performance.now();

    for (let iteration = 0; iteration < iterations; iteration++) {
        operation();
    }

    const elapsed = performance.now() - start;
    if (elapsed > maxMilliseconds) {
        throw new Error(
            `${label} performance regression: ${elapsed.toFixed(2)}ms ` +
            `for ${iterations} checks (limit: ${maxMilliseconds}ms)`
        );
    }

    return elapsed;
}

export async function runTestFiles(...testFiles: readonly string[]): Promise<void> {
    for (const testFile of testFiles) {
        await import(testFile);
    }
}
