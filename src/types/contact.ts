export type ContactFieldData = {
    label: string;
    placeholder: string;
    hint?: string;
    error?: string;
};

export type ContactData = {
    title: string;
    lead: string;
    addressLabel: string;
    address: string;
    hoursLabel: string;
    hours: string;
    phoneLabel: string;
    phone: string;
    phoneHref: string;
    formKicker: string;
    fields: {
        name: ContactFieldData;
        phone: ContactFieldData;
        email: ContactFieldData;
        comment: ContactFieldData;
    };
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successText: string;
    errorTitle: string;
    errorText: string;
    duplicateText: string;
};
