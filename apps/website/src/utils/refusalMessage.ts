import type { ContactMessages } from '#/types/contact';

export function refusalMessage(
    code: string | null,
    messages: ContactMessages,
): string {
    switch (code) {
        case 'INVALID_INTEREST':
            return messages.emptyInterest;
        case 'INVALID_NAME':
            return messages.invalidName;
        case 'INVALID_PHONE_NUMBER':
            return messages.invalidPhone;
        case 'INVALID_NOTE':
            return messages.invalidNote;
        default:
            return messages.failed;
    }
}
