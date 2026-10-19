export type LeadInterest = 'subscription' | 'one_time' | 'question';

export type ContactFieldData = {
    label: string;
    placeholder: string;
};

export type ContactInterestOption = {
    value: LeadInterest;
    label: string;
};

export type ContactMessages = {
    emptyName: string;
    emptyPhone: string;
    emptyInterest: string;
    invalidName: string;
    invalidPhone: string;
    invalidNote: string;
    network: string;
    failed: string;
    created: string;
    updated: string;
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
        interest: ContactFieldData & {
            options: ContactInterestOption[];
        };
        comment: ContactFieldData;
    };
    createLabel: string;
    updateLabel: string;
    submittingLabel: string;
    countdown: string;
    messages: ContactMessages;
};
