const STORAGE_KEY = 'lead';
const DAY_MS = 24 * 60 * 60 * 1000;

export type StoredLead = {
    id: string;
    expired: boolean;
    known: boolean;
};

let memory: StoredLead | null = null;

function storage(): Storage | null {
    try {
        if (typeof window === 'undefined') return null;
        return window.localStorage;
    } catch {
        return null;
    }
}

function readRaw(): unknown {
    const store = storage();
    if (!store) return memory;
    try {
        const raw = store.getItem(STORAGE_KEY);
        if (raw == null) return null;
        return JSON.parse(raw) as unknown;
    } catch {
        return memory;
    }
}

export function saveLead(lead: StoredLead): StoredLead {
    memory = lead;
    const store = storage();
    if (!store) return lead;
    try {
        store.setItem(STORAGE_KEY, JSON.stringify(lead));
    } catch {
        return lead;
    }
    return lead;
}

function milliseconds(value: unknown, now: number): string | null {
    if (typeof value !== 'string' || !/^[1-9]\d*$/.test(value)) return null;
    const id = Number(value);
    if (!Number.isSafeInteger(id) || id <= 0 || id > now) return null;
    return value;
}

export function loadLead(now: number): StoredLead {
    const raw = readRaw();
    const record =
        raw !== null && typeof raw === 'object'
            ? (raw as { id?: unknown; known?: unknown })
            : null;
    const id = record ? milliseconds(record.id, now) : null;
    if (!id) {
        return saveLead({ id: String(now), expired: false, known: false });
    }
    return saveLead({
        id,
        expired: now - Number(id) >= DAY_MS,
        known: record?.known === true,
    });
}

export function formatRemaining(id: string, now: number): string | null {
    const remaining = Number(id) + DAY_MS - now;
    if (remaining <= 0) return null;
    const totalSeconds = Math.ceil(remaining / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (part: number) => String(part).padStart(2, '0');
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}
