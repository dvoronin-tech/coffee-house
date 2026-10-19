import { useLayoutEffect, useState } from 'react';
import type { SubmitEvent } from 'react';
import toast from 'react-hot-toast';
import { order } from '#/api/order';
import type { ContactMessages, LeadInterest } from '#/types/contact';
import { loadLead, saveLead, type StoredLead } from '#/utils/leadRecord';
import { refusalMessage } from '#/utils/refusalMessage';
import { responseCode } from '#/utils/responseCode';

export type LeadValues = {
    name: string;
    phone: string;
    interest: '' | LeadInterest;
    comment: string;
};

type UseHandleSubmitLeadFormParams = {
    messages: ContactMessages;
    submittingLabel: string;
    updateLabel: string;
    createLabel: string;
};

export function useHandleSubmitLeadForm({
    messages,
    submittingLabel,
    updateLabel,
    createLabel,
}: UseHandleSubmitLeadFormParams) {
    const [values, setValues] = useState<LeadValues>({
        name: '',
        phone: '',
        interest: '',
        comment: '',
    });
    const [record, setRecord] = useState<StoredLead | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    useLayoutEffect(() => {
        setRecord(loadLead(Date.now()));
    }, []);

    const expireLead = (id: string) => {
        setRecord((current) => {
            if (!current || current.id !== id || current.expired) {
                return current;
            }
            return saveLead({ ...current, expired: true });
        });
    };

    const report = (message: string) => {
        setFormError(message);
        toast(message);
    };

    const changeField = <Key extends keyof LeadValues>(
        field: Key,
        value: LeadValues[Key],
    ) => {
        setValues((current) => ({ ...current, [field]: value }));
        setFormError(null);
    };

    const onSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;
        setFormError(null);

        if (values.name.trim() === '') {
            report(messages.emptyName);
            return;
        }
        if (values.phone.trim() === '') {
            report(messages.emptyPhone);
            return;
        }
        if (values.interest === '') {
            report(messages.emptyInterest);
            return;
        }

        const current = record ?? loadLead(Date.now());
        const lead = current.expired
            ? saveLead({
                  id: String(Date.now()),
                  expired: false,
                  known: false,
              })
            : current;
        if (lead !== record) setRecord(lead);

        const interest = values.interest;
        const note = values.comment.trim();
        setPending(true);
        try {
            const response = await order({
                id: lead.id,
                name: values.name,
                phone: values.phone,
                interest,
                ...(note ? { note } : {}),
            });
            const code = await responseCode(response);
            if (response.ok && (code === 'CREATED' || code === 'UPDATED')) {
                setRecord(saveLead({ ...lead, known: true }));
                setFormError(null);
                toast(code === 'CREATED' ? messages.created : messages.updated);
                return;
            }
            report(refusalMessage(code, messages));
        } catch {
            report(messages.network);
        } finally {
            setPending(false);
        }
    };

    const buttonLabel = pending
        ? submittingLabel
        : record?.known && !record.expired
          ? updateLabel
          : createLabel;
    const counting = Boolean(record?.known && !record.expired);

    return {
        values,
        record,
        formError,
        pending,
        buttonLabel,
        counting,
        changeField,
        expireLead,
        onSubmit,
    };
}
