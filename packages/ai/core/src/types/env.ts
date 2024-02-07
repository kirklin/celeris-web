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

      DEBUG_CHAT_COMPLETION?: string;
    }
  }
}
