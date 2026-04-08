/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMeta {
  glob: <T>(pattern: string, options?: {
    eager?: boolean;
    import?: string;
    query?: string;
    exclude?: string[];
    recursive?: boolean;
  }) => Record<string, T>;
}