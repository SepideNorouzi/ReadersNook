/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEV_USERNAME: string;
  readonly VITE_DEV_PASSWORD: string;
  readonly VITE_DEV_AUTO_LOGIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
