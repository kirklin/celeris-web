import { OpenAI } from "openai";
import type { ClientOptions } from "openai";
import urlJoin from "url-join";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { AbstractLanguageModel } from "../abstractAI";
import { AgentRuntimeError, DEBUG_CHAT_COMPLETION, LanguageModelAgentRuntimeErrorType, debugStream, handleOpenAIError } from "../utils";

import type { OpenAIChatStreamPayload } from "../../types";

import { desensitizeUrl } from "../utils/desensitizeUrl";
import { ModelBrandProvider } from "../types";

const DEFAULT_BASE_URL = "https://api.openai.com/v1";
interface AzureOpenAIOptions extends ClientOptions {
  azureOptions?: {
    apiVersion?: string;
    model?: string;
  };
  useAzure?: boolean;
}
export class CelerisOpenAILanguageModel extends AbstractLanguageModel<AzureOpenAIOptions> {
  private client: OpenAI;
  _baseURL: string;
  constructor(options: AzureOpenAIOptions) {
    super(ModelBrandProvider.OpenAI);
    if (!options.apiKey) {
      throw AgentRuntimeError.createError(LanguageModelAgentRuntimeErrorType.NoOpenAIAPIKey);
    }

    if (options.useAzure) {
      this.client = CelerisOpenAILanguageModel.initWithAzureOpenAI(options);
    } else {
      this.client = new OpenAI(options);
    }

    this._baseURL = this.client.baseURL;
  }

  async chat(payload: OpenAIChatStreamPayload) {
    // ============  1. preprocess messages   ============ //
    const { messages, ...params } = payload;

    // ============  2. send api   ============ //
    try {
      const response = await this.client.chat.completions.create(
        {
          messages,
          ...params,
          stream: true,
        } as unknown as OpenAI.ChatCompletionCreateParamsStreaming,
        { headers: { Accept: "*/*" } },
      );

      const stream = OpenAIStream(response);

      const [debug, prod] = stream.tee();

      if (DEBUG_CHAT_COMPLETION) {
        debugStream(debug).catch(console.error);
      }

      return new StreamingTextResponse(prod);
    } catch (error) {
      const { errorResult, RuntimeError } = handleOpenAIError(error);

      const errorType = RuntimeError || LanguageModelAgentRuntimeErrorType.OpenAIBusinessError;

      let desensitizedEndpoint = this._baseURL;

      if (this._baseURL !== DEFAULT_BASE_URL) {
        desensitizedEndpoint = desensitizeUrl(this._baseURL);
      }

      throw AgentRuntimeError.chat({
        endpoint: desensitizedEndpoint,
        error: errorResult,
        errorType,
        provider: this._brandId,
      });
    }
  }

  static initWithAzureOpenAI(options: AzureOpenAIOptions) {
    const endpoint = options.baseURL!;
    const model = options.azureOptions?.model || "";
    // refs: https://test-001.openai.azure.com/openai/deployments/gpt-35-turbo
    const baseURL = urlJoin(endpoint, `/openai/deployments/${model.replace(".", "")}`);

    const apiVersion = options.azureOptions?.apiVersion || "2023-08-01-preview";
    const apiKey = options.apiKey!;

    const config: ClientOptions = {
      apiKey,
      baseURL,
      defaultHeaders: { "api-key": apiKey },
      defaultQuery: { "api-version": apiVersion },
    };

    return new OpenAI(config);
  }
}
