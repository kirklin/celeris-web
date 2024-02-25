export const LanguageModelAgentRuntimeErrorType = {
  AgentRuntimeError: "AgentRuntimeError", // Agent Runtime 模块运行时错误
  LocationNotSupportedError: "LocationNotSupportedError", // 不支持的位置错误
  OpenAIBusinessError: "OpenAIBusinessError", // OpenAI 业务错误
  MockAIBusinessError: "MockAIBusinessError", // Mock 业务错误
  NoOpenAIAPIKey: "NoOpenAIAPIKey", // 缺少 OpenAI API 密钥
  InvalidAzureAPIKey: "InvalidAzureAPIKey", // 无效的 Azure API 密钥
  AzureBusinessError: "AzureBusinessError", // Azure 业务错误
} as const;

export type ICelerisAgentRuntimeErrorType =
  (typeof LanguageModelAgentRuntimeErrorType)[keyof typeof LanguageModelAgentRuntimeErrorType];
