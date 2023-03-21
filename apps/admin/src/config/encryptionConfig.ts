// Default cache time for the system, measured in seconds
import { isDevMode } from "@celeris/utils";

export const DEFAULT_STORAGE_TIME = 60 * 60 * 24 * 7;

// Key used for AES encryption of storage
export const STORAGE_CIPHER_KEY = "celeris-admin@";
// Initialization vector used for AES encryption of storage
export const STORAGE_CIPHER_IV = "@celeris-admin";

// Determines whether storage encryption using AES should be enabled in the system
export const SHOULD_ENABLE_STORAGE_ENCRYPTION = !isDevMode();
