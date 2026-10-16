import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import clsx from 'clsx';
import type { ContactData } from '#/types/contact';

import styles from './LeadForm.module.scss';

export type LeadFormVariant = 'card' | 'editorial' | 'panel';

type FieldName = 'name' | 'phone' | 'email' | 'comment';

type LeadValues = Record<FieldName, string>;

type LeadErrors = Partial<Record<FieldName, boolean>>;

type LeadStatus = 'idle' | 'submitting' | 'success' | 'error' | 'duplicate';

type LeadSource = {
    utm_source: string;
    utm_medium: string;
    utm_campaign: string;
    utm_content: string;
    page: string;
    referrer: string;
};

const EMPTY_SOURCE: LeadSource = {
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_content: '',
    page: '',
    referrer: '',
};

const PHONE_DIGITS = 9;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;
const SOURCE_INPUTS = Object.keys(EMPTY_SOURCE) as (keyof LeadSource)[];

// Телефон нормализуем до +375 и ровно 9 цифр, например «+375 29 123 45 67».
function formatPhone(raw: string): string {
    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('375')) {
        digits = digits.slice(3);
    } else if (digits.startsWith('80') && digits.length > PHONE_DIGITS) {
        digits = digits.slice(2);
    }
    digits = digits.slice(0, PHONE_DIGITS);
    if (digits === '') return '';
    const groups = [
        digits.slice(0, 2),
        digits.slice(2, 5),
        digits.slice(5, 7),
        digits.slice(7, 9),
    ];
    return ['+375', ...groups.filter(Boolean)].join(' ');
}

function isPhoneValid(value: string): boolean {
    return formatPhone(value).replace(/\D/g, '').length === 3 + PHONE_DIGITS;
}

function validate(values: LeadValues): LeadErrors {
    return {
        name: values.name.trim() === '',
        phone: !isPhoneValid(values.phone),
        email: !EMAIL_PATTERN.test(values.email.trim()),
    };
}

function collectSource(): LeadSource {
    const params = new URLSearchParams(window.location.search);
    return {
        utm_source: params.get('utm_source') ?? '',
        utm_medium: params.get('utm_medium') ?? '',
        utm_campaign: params.get('utm_campaign') ?? '',
        utm_content: params.get('utm_content') ?? '',
        page: window.location.href,
        referrer: document.referrer,
    };
}

interface Props {
    data: ContactData;
    variant?: LeadFormVariant;
}

export default function LeadForm({ data, variant = 'card' }: Props) {
    const [values, setValues] = useState<LeadValues>({
        name: '',
        phone: '',
        email: '',
        comment: '',
    });
    const [errors, setErrors] = useState<LeadErrors>({});
    const [status, setStatus] = useState<LeadStatus>('idle');
    const [source, setSource] = useState<LeadSource>(EMPTY_SOURCE);

    useEffect(() => {
        setSource(collectSource());
    }, []);

    const setValue = (field: FieldName, value: string) => {
        setValues((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) =>
            prev[field] ? { ...prev, [field]: undefined } : prev,
        );
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status === 'submitting') return;

        const nextErrors = validate(values);
        setErrors(nextErrors);

        const firstInvalid = (Object.keys(nextErrors) as FieldName[]).find(
            (field) => nextErrors[field],
        );
        if (firstInvalid) {
            document.getElementById(`lead-${firstInvalid}`)?.focus();
            return;
        }

        setStatus('submitting');
        // Этап макета: отправки на сервер нет. Состояния рисуются локально;
        // ?mock=error и ?mock=duplicate показывают ответ сервера.
        window.setTimeout(() => {
            console.info('[lead] payload (макет, без отправки)', {
                ...values,
                ...source,
            });
            const mock = new URLSearchParams(window.location.search).get(
                'mock',
            );
            if (mock === 'error') setStatus('error');
            else if (mock === 'duplicate') setStatus('duplicate');
            else setStatus('success');
        }, 900);
    };

    const pending = status === 'submitting';

    return (
        <form
            className={clsx(styles.form, styles[variant])}
            noValidate
            onSubmit={handleSubmit}
        >
            {SOURCE_INPUTS.map((name) => (
                <input
                    key={name}
                    type='hidden'
                    name={name}
                    value={source[name]}
                />
            ))}

            {status === 'success' ? (
                <div className={styles.success} role='status'>
                    <p className={styles.successTitle}>{data.successTitle}</p>
                    <p className={styles.successText}>{data.successText}</p>
                </div>
            ) : (
                <>
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
                                onChange={(event) =>
                                    setValue('name', event.target.value)
                                }
                                aria-invalid={errors.name || undefined}
                                aria-describedby={
                                    errors.name ? 'lead-name-error' : undefined
                                }
                            />
                            {errors.name && (
                                <p
                                    className={styles.fieldError}
                                    id='lead-name-error'
                                >
                                    {data.fields.name.error}
                                </p>
                            )}
                        </div>

                        <div className={styles.field}>
                            <label
                                className={styles.label}
                                htmlFor='lead-phone'
                            >
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
                                maxLength={17}
                                value={values.phone}
                                onChange={(event) =>
                                    setValue(
                                        'phone',
                                        formatPhone(event.target.value),
                                    )
                                }
                                aria-invalid={errors.phone || undefined}
                                aria-describedby={
                                    errors.phone
                                        ? 'lead-phone-error'
                                        : undefined
                                }
                            />
                            {errors.phone && (
                                <p
                                    className={styles.fieldError}
                                    id='lead-phone-error'
                                >
                                    {data.fields.phone.error}
                                </p>
                            )}
                        </div>

                        <div className={clsx(styles.field, styles.fieldWide)}>
                            <label
                                className={styles.label}
                                htmlFor='lead-email'
                            >
                                {data.fields.email.label}
                            </label>
                            <input
                                id='lead-email'
                                name='email'
                                type='email'
                                className={styles.input}
                                autoComplete='email'
                                placeholder={data.fields.email.placeholder}
                                value={values.email}
                                onChange={(event) =>
                                    setValue('email', event.target.value)
                                }
                                aria-invalid={errors.email || undefined}
                                aria-describedby={
                                    errors.email
                                        ? 'lead-email-error'
                                        : undefined
                                }
                            />
                            {errors.email && (
                                <p
                                    className={styles.fieldError}
                                    id='lead-email-error'
                                >
                                    {data.fields.email.error}
                                </p>
                            )}
                        </div>

                        <div className={clsx(styles.field, styles.fieldWide)}>
                            <label
                                className={styles.label}
                                htmlFor='lead-comment'
                            >
                                {data.fields.comment.label}
                            </label>
                            <textarea
                                id='lead-comment'
                                name='comment'
                                rows={3}
                                className={clsx(styles.input, styles.textarea)}
                                placeholder={data.fields.comment.placeholder}
                                value={values.comment}
                                onChange={(event) =>
                                    setValue('comment', event.target.value)
                                }
                            />
                        </div>
                    </div>

                    <button
                        className={styles.button}
                        type='submit'
                        disabled={pending}
                    >
                        {pending ? data.submittingLabel : data.submitLabel}
                    </button>

                    {status === 'error' && (
                        <div
                            className={clsx(styles.status, styles.statusError)}
                            role='alert'
                        >
                            <p className={styles.statusTitle}>
                                {data.errorTitle}
                            </p>
                            <p className={styles.statusText}>
                                {data.errorText}{' '}
                                <a
                                    className={styles.statusPhone}
                                    href={data.phoneHref}
                                >
                                    {data.phone}
                                </a>
                            </p>
                        </div>
                    )}

                    {status === 'duplicate' && (
                        <div
                            className={clsx(
                                styles.status,
                                styles.statusDuplicate,
                            )}
                            role='status'
                        >
                            <p className={styles.statusText}>
                                {data.duplicateText}
                            </p>
                        </div>
                    )}
                </>
            )}
        </form>
    );
}
