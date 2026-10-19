import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';
import type { ContactData } from '#/types/contact';
import LeadCountdown from './LeadCountdown';
import {
    useHandleSubmitLeadForm,
    type LeadValues,
} from './useHandleSubmitLeadForm';

import styles from './LeadForm.module.scss';

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
    const {
        values,
        record,
        formError,
        pending,
        buttonLabel,
        counting,
        changeField,
        expireLead,
        onSubmit,
    } = useHandleSubmitLeadForm({
        messages: data.messages,
        submittingLabel: data.submittingLabel,
        updateLabel: data.updateLabel,
        createLabel: data.createLabel,
    });

    return (
        <form className={styles.form} noValidate onSubmit={onSubmit}>
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
                >
                    {buttonLabel}
                </button>
                {formError && (
                    <p className={styles.formError} role='alert'>
                        {formError}
                    </p>
                )}
                {counting && record && (
                    <LeadCountdown
                        id={record.id}
                        template={data.countdown}
                        onExpire={expireLead}
                    />
                )}
            </div>
        </form>
    );
}
