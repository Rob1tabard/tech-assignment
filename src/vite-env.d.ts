/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly API_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
