type ProcessLike = {
    env?: Record<string, string | undefined>;
};

export function env(name: string): string | undefined {
    const runtime = globalThis as typeof globalThis & { process?: ProcessLike };
    return runtime.process?.env?.[name];
}
