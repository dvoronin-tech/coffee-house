const rejectionCodeByField = {
    id: 'INVALID_ID',
    name: 'INVALID_NAME',
    phone: 'INVALID_PHONE_NUMBER',
    note: 'INVALID_NOTE',
} as const;

const rejectionFieldOrder: (keyof typeof rejectionCodeByField)[] = ['id', 'name', 'phone', 'note'];

export type SendOrderRejectionCode =
    (typeof rejectionCodeByField)[keyof typeof rejectionCodeByField];

export function sendOrderRejectionCode(error: {
    issues: readonly { path?: readonly PropertyKey[] }[];
}): SendOrderRejectionCode {
    for (const field of rejectionFieldOrder) {
        if (error.issues.some((issue) => issue.path?.[0] === field)) {
            return rejectionCodeByField[field];
        }
    }
    return rejectionCodeByField.id;
}
