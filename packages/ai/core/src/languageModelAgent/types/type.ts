import type OpenAI from "openai";
import type { ICelerisAgentRuntimeErrorType } from "../utils";
import type { OpenAIChatStreamPayload } from "../../types";

export interface AgentInitErrorPayload {
  error: object;
  errorType: string | number;
}

export interface ChatCompletionErrorPayload {
  [key: string]: any;
  endpoint?: string;
  error: object;
  errorType: ICelerisAgentRuntimeErrorType;
  provider: ModelBrandProvider;
}

export interface CreateChatCompletionOptions {
  chatModel: OpenAI;
  payload: OpenAIChatStreamPayload;
}

export enum ModelBrandProvider {
  Azure = "azure",
  ChatGLM = "chatglm",
  Google = "google",
  OpenAI = "openai",
  Celeris = "celeris",
}
