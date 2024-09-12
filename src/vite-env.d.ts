/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_ACCESS_TOKEN: string;
  readonly BASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
