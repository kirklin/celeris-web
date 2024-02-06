/**
 * 大型语言模型抽象类
 * Abstract class for large language models
 */
export abstract class LanguageModel<ModelParams> {
  /**
   * 模型的品牌标识符，应该是唯一的。
   * Brand id of the model, should be unique.
   */
  static _brandId: string = "celeris-model";

  /**
   * 模型标识（例如 "gpt-3.5-turbo"）
   * Identifier of the model (eg. "gpt-3.5-turbo")
   */
  static _model: string = "";

  /**
   * 基本URL
   * Base URL
   */
  static _baseURL?: string;

  /**
   * API密钥
   * API key
   */
  protected static _apiKey: string = "";

  /**
   * 是否可用
   * Whether the model is available
   */
  static _isAvailable: boolean = false;

  /**
   * 模型参数
   * Model parameters
   */
  protected _modelParams: ModelParams;

  protected constructor(modelParams: ModelParams) {
    this._modelParams = modelParams;
  }

  /**
   * 获取API密钥
   * Get API key
   */
  static get apiKey(): string {
    return this._apiKey;
  }

  /**
   * 获取API密钥
   * Get API key
   */
  static set apiKey(apiKey: string) {
    this._apiKey = apiKey;
  }
}
