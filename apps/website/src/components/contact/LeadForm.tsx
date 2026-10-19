import { useLayoutEffect, useState } from 'react';
import type { SubmitEvent } from 'react';
import clsx from 'clsx';
import toast, { Toaster } from 'react-hot-toast';
import type { ContactData, LeadInterest } from '#/types/contact';
import { order } from '#/api/order';
import {
    formatRemaining,
    loadLead,
    saveLead,
    type StoredLead,
} from '#/utils/leadRecord';
import { orderServerUrl } from '#/utils/orderServerUrl';
import { refusalMessage } from '#/utils/refusalMessage';
import { responseCode } from '#/utils/responseCode';

import styles from './LeadForm.module.scss';

type LeadValues = {
    name: string;
    phone: string;
    interest: '' | LeadInterest;
    comment: string;
};

const toastStyle = {
    background: 'var(--color-surface)',
    color: 'var(--color-text)',
    fontFamily: 'var(--font-text)',
    fontSize: '1.5rem',
    lineHeight: 1.4,
    border: '0.1rem solid var(--color-border)',
    borderRadius: '1.2rem',
    padding: '1.2rem 1.6rem',
    maxWidth: '42rem',
};

interface Props {
    data: ContactData;
}

export default function LeadForm({ data }: Props) {
    const [values, setValues] = useState<LeadValues>({
        name: '',
        phone: '',
        interest: '',
        comment: '',
    });
    const [record, setRecord] = useState<StoredLead | null>(null);
    const [clock, setClock] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [pending, setPending] = useState(false);

    useLayoutEffect(() => {
        setRecord(loadLead(Date.now()));
    }, []);

    useLayoutEffect(() => {
        if (!record?.known || record.expired) {
            setClock(null);
            return;
        }
        const id = record.id;
        const tick = () => {
            const label = formatRemaining(id, Date.now());
            if (!label) {
                setClock(null);
                setRecord((current) => {
                    if (!current || current.id !== id || current.expired) {
                        return current;
                    }
                    return saveLead({ ...current, expired: true });
                });
                return;
            }
            setClock(label);
        };
        tick();
        const timer = window.setInterval(tick, 1000);
        return () => window.clearInterval(timer);
    }, [record?.id, record?.known, record?.expired]);

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

    const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (pending) return;
        setFormError(null);

        if (values.name.trim() === '') {
            report(data.messages.emptyName);
            return;
        }
        if (values.phone.trim() === '') {
            report(data.messages.emptyPhone);
            return;
        }
        if (values.interest === '') {
            report(data.messages.emptyInterest);
            return;
        }

        const base = orderServerUrl();
        if (!base) {
            report(data.messages.failed);
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
            const response = await order(base, {
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
                toast(
                    code === 'CREATED'
                        ? data.messages.created
                        : data.messages.updated,
                );
                return;
            }
            report(refusalMessage(code, data.messages));
        } catch {
            report(data.messages.network);
        } finally {
            setPending(false);
        }
    };

    const buttonLabel = pending
        ? data.submittingLabel
        : record?.known && !record.expired
          ? data.updateLabel
          : data.createLabel;
    const countdown =
        clock && record?.known && !record.expired
            ? data.countdown.replace('{time}', clock)
            : null;
    const describedBy =
        [
            formError ? 'lead-form-error' : '',
            countdown ? 'lead-form-countdown' : '',
        ]
            .filter(Boolean)
            .join(' ') || undefined;

    return (
        <form className={styles.form} noValidate onSubmit={handleSubmit}>
            <Toaster
                position='top-center'
                containerStyle={{ top: '1.6rem' }}
                toastOptions={{ style: toastStyle }}
            />
            <div className={styles.fields}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor='lead-name'>
                        {data.fields.name.label}
                    </label>
                    <input
                        id='lead-name'
                        name='name'
                        type='text'
                        className={styles.input}
                        autoComplete='name'
                        placeholder={data.fields.name.placeholder}
                        value={values.name}
                        disabled={pending}
                        onChange={(event) =>
                            changeField('name', event.target.value)
                        }
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor='lead-phone'>
                        {data.fields.phone.label}
                    </label>
                    <input
                        id='lead-phone'
                        name='phone'
                        type='tel'
                        className={styles.input}
                        autoComplete='tel'
                        inputMode='tel'
                        placeholder={data.fields.phone.placeholder}
                        value={values.phone}
                        disabled={pending}
                        onChange={(event) =>
                            changeField('phone', event.target.value)
                        }
                    />
                </div>

                <div className={styles.field}>
                    <label
                        className={clsx(styles.label, styles.srOnly)}
                        htmlFor='lead-interest'
                    >
                        {data.fields.interest.label}
                    </label>
                    <select
                        id='lead-interest'
                        name='interest'
                        className={clsx(styles.input, styles.select, {
                            [styles.selectPlaceholder]: values.interest === '',
                        })}
                        value={values.interest}
                        disabled={pending}
                        onChange={(event) =>
                            changeField(
                                'interest',
                                event.target.value as LeadValues['interest'],
                            )
                        }
                    >
                        <option value=''>
                            {data.fields.interest.placeholder}
                        </option>
                        {data.fields.interest.options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor='lead-comment'>
                        {data.fields.comment.label}
                    </label>
                    <textarea
                        id='lead-comment'
                        name='comment'
                        rows={3}
                        className={clsx(styles.input, styles.textarea)}
                        placeholder={data.fields.comment.placeholder}
                        value={values.comment}
                        disabled={pending}
                        onChange={(event) =>
                            changeField('comment', event.target.value)
                        }
                    />
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    className={styles.button}
                    type='submit'
                    disabled={pending}
                    aria-describedby={describedBy}
                >
                    {buttonLabel}
                </button>
                {formError && (
                    <p
                        className={styles.formError}
                        id='lead-form-error'
                        role='alert'
                    >
                        {formError}
                    </p>
                )}
                {countdown && (
                    <p className={styles.countdown} id='lead-form-countdown'>
                        {countdown}
                    </p>
                )}
            </div>
        </form>
    );
}
