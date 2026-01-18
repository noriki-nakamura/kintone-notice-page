/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
    readonly KINTONE_BASE_URL: string;
    readonly KINTONE_API_TOKEN: string;
    readonly KINTONE_APP_ID: string;
    readonly GOOGLE_CALENDAR_EMBED_URL?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
