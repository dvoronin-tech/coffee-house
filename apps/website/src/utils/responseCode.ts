export async function responseCode(response: Response): Promise<string | null> {
    try {
        const body: unknown = await response.json();
        if (
            body !== null &&
            typeof body === 'object' &&
            'code' in body &&
            typeof body.code === 'string'
        ) {
            return body.code;
        }
    } catch {
        return null;
    }
    return null;
}
