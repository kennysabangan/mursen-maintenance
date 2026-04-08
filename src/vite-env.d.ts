/// <reference types="vite/client" />

interface ImportMeta {
  glob: <T>(pattern: string, options?: {
    eager?: boolean;
    import?: string;
    query?: string;
    exclude?: string[];
    recursive?: boolean;
  }) => Record<string, T>;
}