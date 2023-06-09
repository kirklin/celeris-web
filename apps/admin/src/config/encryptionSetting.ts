// This constant sets the default cache time for the system, measured in seconds
export const DEFAULT_STORAGE_TIME = 60 * 60 * 24 * 7;

// This constant defines the key used for AES encryption of storage
export const STORAGE_CIPHER_KEY = "celeris-web-admin@";

// This constant defines the initialization vector used for AES encryption of storage
export const STORAGE_CIPHER_IV = "@celeris-web-admin";

// This constant determines whether storage encryption using AES should be enabled in the system
// It is set to true in production mode and false in development mode
export const SHOULD_ENABLE_STORAGE_ENCRYPTION = !import.meta.env.DEV;
