import {
  CelerisAzureOpenAI,
  CelerisOpenAILanguageModel,
  ModelBrandProvider,
} from "@celeris/ai-core";
import type {
  AbstractLanguageModel,
  OpenAIChatStreamPayload,
} from "@celeris/ai-core";
import { CelerisMockLanguageModel } from "@celeris/ai-core/src/languageModelAgent/celeris";
import { getServerConfig } from "../config/server";
import type { JWTPayload } from "../constants/auth";

interface AzureOpenAIParams {
  apiVersion?: string;
  model: string;
  useAzure?: boolean;
}

class LanguageModelAgent {
  private _runtime: AbstractLanguageModel<any>;

  constructor(runtime: AbstractLanguageModel<any>) {
    this._runtime = runtime;
  }

  async chat(payload: OpenAIChatStreamPayload) {
    return this._runtime.chat(payload);
  }

  static async initializeWithUserPayload(
    provider: string,
    payload: JWTPayload,
    azureOpenAI?: AzureOpenAIParams,
  ) {
    let runtimeModel: AbstractLanguageModel<any>;

    switch (provider) {
      // eslint-disable-next-line default-case-last
      default:
      case ModelBrandProvider.OpenAI: {
        runtimeModel = this.initOpenAI(payload, azureOpenAI);
        break;
      }

      case ModelBrandProvider.Azure: {
        runtimeModel = this.initAzureOpenAI(payload);
        break;
      }

      case ModelBrandProvider.Celeris:{
        runtimeModel = this.initMockAI();
        break;
      }
    }

    return new LanguageModelAgent(runtimeModel);
  }

  private static initOpenAI(payload: JWTPayload, azureOpenAI?: AzureOpenAIParams) {
    const { OPENAI_API_KEY, OPENAI_PROXY_URL, AZURE_API_VERSION, AZURE_API_KEY, USE_AZURE_OPENAI }
      = getServerConfig();
    const apiKey = payload?.apiKey || OPENAI_API_KEY;
    const baseURL = payload?.endpoint || OPENAI_PROXY_URL;

    const azureApiKey = payload.apiKey || AZURE_API_KEY;
    const useAzure = azureOpenAI?.useAzure || USE_AZURE_OPENAI;
    const apiVersion = azureOpenAI?.apiVersion || AZURE_API_VERSION;

    return new CelerisOpenAILanguageModel({
      apiKey: azureOpenAI?.useAzure ? azureApiKey : apiKey,
      azureOptions: {
        apiVersion,
        model: azureOpenAI?.model,
      },
      baseURL,
      useAzure,
    });
  }

  private static initMockAI() {
    return new CelerisMockLanguageModel();
  }

  private static initAzureOpenAI(payload: JWTPayload) {
    const { AZURE_API_KEY, AZURE_API_VERSION, AZURE_ENDPOINT } = getServerConfig();
    const apiKey = payload?.apiKey || AZURE_API_KEY;
    const endpoint = payload?.endpoint || AZURE_ENDPOINT;
    const apiVersion = payload?.azureApiVersion || AZURE_API_VERSION;

    return new CelerisAzureOpenAI(endpoint, apiKey, apiVersion);
  }
}

export default LanguageModelAgent;
