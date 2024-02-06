import type { ChatModelCard } from "../../types/model/openai/ChatGPTModel";
import OpenAIProvider from "./openai";

export const CELERIS_DEFAULT_MODEL_LIST: ChatModelCard[] = [
  OpenAIProvider.chatModels,
].flat();

export { default as OpenAIProvider } from "./openai";
