import { defineEventHandler, defineLazyEventHandler, getRequestHeader, getRouterParam, readBody } from "h3";
import type { OpenAIChatStreamPayload } from "@celeris/ai-core";
import { AgentRuntimeError } from "@celeris/ai-core/src/languageModelAgent/utils/error/createError";
import LanguageModelAgent from "../../agent";
import { getServerConfig } from "../../config/server";
import { CELERIS_CHAT_AUTH_HEADER } from "../../auth/constants";
import { ChatErrorType } from "../../error";

export default defineLazyEventHandler(async () => {
  let agentRuntime: LanguageModelAgent;

  const { OPENAI_API_KEY, OPENAI_PROXY_URL } = getServerConfig();
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key");
  }
  return defineEventHandler(async (event: any) => {
    // ============  1. init chat model   ============ //
    // const authorization = getRequestHeader(event, "authorization");
    const provider = getRouterParam(event, "provider");
    // TODO authorization
    // get Authorization from header
    const authorization = getRequestHeader(event, CELERIS_CHAT_AUTH_HEADER);
    if (!authorization) {
      throw AgentRuntimeError.createError(ChatErrorType.Unauthorized);
    }
    const openAIChatStreamPayload = await readBody(event) as OpenAIChatStreamPayload;
    agentRuntime = await LanguageModelAgent.initializeWithUserPayload(provider, {
      apiKey: OPENAI_API_KEY,
      /**
       * Represents the endpoint of provider
       */
      endpoint: OPENAI_PROXY_URL,
    });

    // Respond with the stream
    return await agentRuntime.chat(openAIChatStreamPayload);
  });
});
