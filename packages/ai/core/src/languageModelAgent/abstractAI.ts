import type { StreamingTextResponse } from "ai";
import type { OpenAIChatStreamPayload } from "../types/model/openai/OpenAIModel";
import { ModelBrandProvider } from "./types";

/**
 * 大型语言模型抽象类
 * Abstract class for large language models
 */
export abstract class AbstractLanguageModel<ModelParams> {
  /**
   * 模型的品牌标识符，应该是唯一的。
   * Brand id of the model, should be unique.
   */
  _brandId: ModelBrandProvider;

  /**
   * 基本URL
   * Base URL
   */
  _baseURL?: string;

  /**
   * 模型参数
   * Model parameters
   */
  _modelParams?: ModelParams;

  constructor(brandId = ModelBrandProvider.Celeris, baseURL?: string, modelParams?: ModelParams) {
    this._brandId = brandId; // Default value from ModelBrandProvider
    this._baseURL = baseURL; // Initialized to empty string
    this._modelParams = modelParams; // Initialized with an empty object
  }

  abstract chat(payload: OpenAIChatStreamPayload): Promise<StreamingTextResponse>;
}
