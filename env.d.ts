/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WCCLIENT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
