import { useLayoutEffect, useRef, useState } from 'react';
import { formatRemaining } from '#/utils/leadRecord';

import styles from './LeadCountdown.module.scss';

interface Props {
    id: string;
    template: string;
    onExpire: (id: string) => void;
}

export default function LeadCountdown({ id, template, onExpire }: Props) {
    const [clock, setClock] = useState<string | null>(null);
    const onExpireRef = useRef(onExpire);
    onExpireRef.current = onExpire;

    useLayoutEffect(() => {
        let timer = 0;
        const tick = () => {
            const label = formatRemaining(id, Date.now());
            if (!label) {
                setClock(null);
                window.clearInterval(timer);
                onExpireRef.current(id);
                return;
            }
            setClock(label);
        };
        tick();
        timer = window.setInterval(tick, 1000);
        return () => window.clearInterval(timer);
    }, [id]);

    if (!clock) return null;

    return (
        <p className={styles.countdown}>
            {template.replace('{time}', clock)}
        </p>
    );
}
