import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().min(1),
    WEB_ORIGIN: z.string().default('http://localhost:4321'),
});

export const env = envSchema.parse(process.env);
