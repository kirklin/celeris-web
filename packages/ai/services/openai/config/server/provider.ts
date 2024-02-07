import process from "node:process";

declare global {
  // eslint-disable-next-line ts/no-namespace
  namespace NodeJS {
    interface ProcessEnv {
      CUSTOM_MODELS?: string;

      // OpenAI Provider
      OPENAI_API_KEY?: string;
      OPENAI_PROXY_URL?: string;
      OPENAI_FUNCTION_REGIONS?: string;

      // Azure OpenAI Provider
      AZURE_API_KEY?: string;
      AZURE_ENDPOINT?: string;
      AZURE_API_VERSION?: string;
      USE_AZURE_OPENAI?: string;

      SERVICES_CIPHER_KEY?: string;
      SERVICES_CIPHER_IV?: string;

      DEBUG_CHAT_COMPLETION?: string;
    }
  }
}

export function getProviderConfig() {
  if (typeof process === "undefined") {
    throw new TypeError("[Server Config] you are importing a server-only module outside of server");
  }

  // region format: iad1,sfo1
  let regions: string[] = [];
  if (process.env.OPENAI_FUNCTION_REGIONS) {
    regions = process.env.OPENAI_FUNCTION_REGIONS.split(",");
  }

  return {
    CUSTOM_MODELS: process.env.CUSTOM_MODELS,

    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    OPENAI_PROXY_URL: process.env.OPENAI_PROXY_URL,
    OPENAI_FUNCTION_REGIONS: regions,

    AZURE_API_KEY: process.env.AZURE_API_KEY,
    AZURE_API_VERSION: process.env.AZURE_API_VERSION,
    AZURE_ENDPOINT: process.env.AZURE_ENDPOINT,
    USE_AZURE_OPENAI: process.env.USE_AZURE_OPENAI === "1",

    SERVICES_CIPHER_KEY: process.env.SERVICES_CIPHER_KEY,
    SERVICES_CIPHER_IV: process.env.SERVICES_CIPHER_IV,

    DEBUG_CHAT_COMPLETION: process.env.DEBUG_CHAT_COMPLETION === "1",
  };
}
