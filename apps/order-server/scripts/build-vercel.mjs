import * as esbuild from 'esbuild';
import { mkdirSync } from 'node:fs';

mkdirSync('api', { recursive: true });
mkdirSync('public', { recursive: true });

await esbuild.build({
    entryPoints: ['src/vercel.ts'],
    outfile: 'api/handler.js',
    bundle: true,
    platform: 'node',
    target: 'node22',
    format: 'esm',
    external: ['pg'],
    sourcemap: true,
});
