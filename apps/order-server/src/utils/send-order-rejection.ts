import { ResponseCodes } from '../app/send-order/send-order.constants';

const errorCodes = ResponseCodes.error;

const rejectionFieldOrder: (keyof typeof errorCodes)[] = [
    'id',
    'name',
    'phone',
    'note',
];

export type SendOrderRejectionCode =
    (typeof errorCodes)[keyof typeof errorCodes];

export function sendOrderRejectionCode(error: {
    issues: readonly { path?: readonly PropertyKey[] }[];
}): SendOrderRejectionCode {
    for (const field of rejectionFieldOrder) {
        if (error.issues.some((issue) => issue.path?.[0] === field)) {
            return errorCodes[field];
        }
    }
    return errorCodes.id;
}
