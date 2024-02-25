import type {
  ChatRequestMessage,
  GetChatCompletionsOptions,
} from "@azure/openai";
import {
  AzureKeyCredential,
  OpenAIClient,
} from "@azure/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

import { AgentRuntimeError, DEBUG_CHAT_COMPLETION, LanguageModelAgentRuntimeErrorType, debugStream } from "../utils";
import type { OpenAIChatStreamPayload } from "../../types";
import { ModelBrandProvider } from "../types";

import { AbstractLanguageModel } from "../abstractAI";

export class CelerisAzureOpenAI extends AbstractLanguageModel<any> {
  private _client: OpenAIClient;
  _baseURL: string;
  constructor(endpoint?: string, apikey?: string, apiVersion?: string) {
    super(ModelBrandProvider.Azure);
    if (!apikey || !endpoint) {
      throw AgentRuntimeError.createError(LanguageModelAgentRuntimeErrorType.InvalidAzureAPIKey);
    }

    this._client = new OpenAIClient(endpoint, new AzureKeyCredential(apikey), { apiVersion });

    this._baseURL = endpoint;
  }

  async chat(payload: OpenAIChatStreamPayload) {
    // ============  1. preprocess messages   ============ //
    const { messages, model, ...params } = payload;

    // ============  2. send api   ============ //

    try {
      const response = await this._client.streamChatCompletions(
        model,
        messages as ChatRequestMessage[],
        params as GetChatCompletionsOptions,
      );

      const stream = OpenAIStream(response);

      const [debug, prod] = stream.tee();

      if (DEBUG_CHAT_COMPLETION) {
        debugStream(debug).catch(console.error);
      }

      return new StreamingTextResponse(prod);
    } catch (e) {
      let error = e as { [key: string]: any; code: string; message: string };

      switch (error.code) {
        case "DeploymentNotFound": {
          error = { ...error, deployId: model };
        }
      }

      const errorType = error.code
        ? LanguageModelAgentRuntimeErrorType.AzureBusinessError
        : LanguageModelAgentRuntimeErrorType.AgentRuntimeError;

      throw AgentRuntimeError.chat({
        error,
        errorType,
        provider: this._brandId,
      });
    }
  }
}
