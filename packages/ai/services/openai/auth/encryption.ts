import type { Encryption } from "@celeris/utils";
import { EncryptionFactory } from "@celeris/utils";
import { getProviderConfig } from "../config/server/provider";

const { SERVICES_CIPHER_KEY, SERVICES_CIPHER_IV } = getProviderConfig();
export const servicesEncryption: Encryption = EncryptionFactory.createAesEncryption({ key: SERVICES_CIPHER_KEY, iv: SERVICES_CIPHER_IV });
