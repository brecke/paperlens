/// <reference types="vite/client" />

type ImportMetaEnv = {
	readonly VITE_PUBMED_API_KEY: string;
	// More env variables...
};

type ImportMeta = {
	readonly env: ImportMetaEnv;
};
