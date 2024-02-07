import type { AgentInitErrorPayload, ChatCompletionErrorPayload } from "../../types";
import type { ICelerisAgentRuntimeErrorType } from "./constants";

export const AgentRuntimeError = {
  chat: (error: ChatCompletionErrorPayload): ChatCompletionErrorPayload => error,
  createError: (
    errorType: ICelerisAgentRuntimeErrorType | string | number,
    error?: any,
  ): AgentInitErrorPayload => ({ error, errorType }),
};
