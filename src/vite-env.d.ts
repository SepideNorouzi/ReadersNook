/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_USERNAME: string;
  readonly VITE_DEV_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
