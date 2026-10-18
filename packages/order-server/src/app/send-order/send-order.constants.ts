export const ResponseCodes = {
    success: {
        created: 'CREATED',
        updated: 'UPDATED',
    },
    error: {
        id: 'INVALID_ID',
        name: 'INVALID_NAME',
        phone: 'INVALID_PHONE_NUMBER',
        note: 'INVALID_NOTE',
        internal: 'INTERNAL_SERVER_ERROR',
    },
} as const;
