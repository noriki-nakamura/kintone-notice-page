import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    // aws amplify hosting output directory is often 'dist', astro defaults to 'dist'
    outDir: 'dist',
});
