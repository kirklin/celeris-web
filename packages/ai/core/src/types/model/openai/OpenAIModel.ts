import type { OpenAIFunctionCall } from "./functionCall";

export enum ChatGPTModelEnum {
  /**
   * GPT 3.5 Turbo
   */
  GPT3_5 = "gpt-3.5-turbo",
  GPT3_5_1106 = "gpt-3.5-turbo-1106",
  GPT3_5_16K = "gpt-3.5-turbo-16k",
  GPT3_5_0125 = "gpt-3.5-turbo-0125",
  /**
   * GPT 4
   */
  GPT4 = "gpt-4",
  GPT4_32K = "gpt-4-32k",
  GPT4_PREVIEW = "gpt-4-0125-preview",
  GPT4_VISION_PREVIEW = "gpt-4-vision-preview",
}

/**
 * Interface representing a text part of a user message content.
 * 表示用户消息内容中文本部分的接口。
 */
interface OpenAIChatUserMessageContentPartText {
  text: string;
  type: "text";
}

/**
 * Interface representing an image part of a user message content.
 * 表示用户消息内容中图像部分的接口。
 */
interface OpenAIChatUserMessageContentPartImage {
  image_url: {
    detail?: "auto" | "low" | "high";
    url: string;
  };
  type: "image_url";
}

/**
 * Union type representing possible content parts of a user message.
 * 表示用户消息可能的内容部分的联合类型。
 */
export type OpenAIChatUserMessageContentPart = OpenAIChatUserMessageContentPartText | OpenAIChatUserMessageContentPartImage;

/**
 * Type representing different roles in a chat.
 * 表示聊天中不同角色的类型。
 */
export type ChatGPTRoleType = "user" | "system" | "assistant" | "function";

/**
 * Interface representing a chat message.
 * 表示聊天消息的接口。
 */
export interface OpenAIChatMessage {
  /**
   * @title Content
   * @description The content of the message.
   * @description 消息的内容。
   */
  content: string | OpenAIChatUserMessageContentPart[];

  function_call?: OpenAIFunctionCall;
  name?: string;
  /**
   * @description The role of the message sender.
   * @description 消息发送者的角色。
   */
  role: ChatGPTRoleType;
}

/**
 * Interface representing completion functions for the chat.
 * 表示聊天完成功能的接口。
 */
export interface OpenAIChatCompletionFunctions {
  /**
   * The description of what the function does.
   * @type {string}
   * @memberof OpenAIChatCompletionFunctions
   */
  description?: string;
  /**
   * The name of the function to be called. Must be a-z, A-Z, 0-9, or contain underscores and dashes, with a maximum length of 64.
   * 要调用的函数的名称。必须是 a-z、A-Z、0-9，或包含下划线和破折号，最大长度为 64 个字符。
   * @type {string}
   * @memberof OpenAIChatCompletionFunctions
   */
  name: string;
  /**
   * The parameters the functions accepts, described as a JSON Schema object. See the [guide](/docs/guides/gpt/function-calling) for examples, and the [JSON Schema reference](https://json-schema.org/understanding-json-schema/) for documentation about the format.
   * 函数接受的参数，描述为 JSON Schema 对象。
   * @type {{ [key: string]: any }}
   * @memberof OpenAIChatCompletionFunctions
   */
  parameters?: {
    [key: string]: any;
  };
}

/**
 * Interface representing a completion tool for the chat.
 * 表示聊天工具的接口。
 */
export interface OpenAIChatCompletionTool {
  function: OpenAIChatCompletionFunctions;

  /**
   * The type of the tool. Currently, only `function` is supported.
   * 工具的类型。目前只支持 `function`。
   */
  type: "function";
}

export interface OpenAIChatStreamPayload {
  /**
   * @title Frequency Penalty
   * @description Controls the penalty applied to the generation text to reduce repetitiveness.
   * @default 0
   * @description 控制生成文本中的惩罚系数，用于减少重复性。
   * @default 0
   */
  frequency_penalty?: number;
  /**
   * @title Max Tokens
   * @description The maximum length of generated text.
   * @description 生成文本的最大长度。
   */
  max_tokens?: number;
  /**
   * @title Chat Messages
   * @description List of chat messages.
   * @description 聊天消息列表。
   */
  messages: OpenAIChatMessage[];
  /**
   * @title Model Name
   * @description The name of the model.
   * @description 模型名称。
   */
  model: ChatGPTModelEnum | string;
  /**
   * @title Number of Texts
   * @description Number of texts to return.
   * @description 返回的文本数量。
   */
  n?: number;
  /**
   * List of enabled plugins.
   * 已启用的插件列表。
   */
  plugins?: string[];
  /**
   * @title Presence Penalty
   * @description Controls the penalty applied to the generation text to reduce topic changes.
   * @default 0
   * @description 控制生成文本中的惩罚系数，用于减少主题的变化。
   * @default 0
   */
  presence_penalty?: number;
  /**
   * @default openai
   */
  provider?: string;
  /**
   * @title Stream Mode
   * @description Indicates whether streaming requests are enabled.
   * @default true
   * @description 表示是否启用流式请求。
   * @default true
   */
  stream?: boolean;
  /**
   * @title Temperature
   * @description Controls the randomness of generated text to control creativity and diversity.
   * @default 0.5
   * @description 控制生成文本的随机度量，用于控制文本的创造性和多样性。
   * @default 0.5
   */
  temperature: number;
  tool_choice?: string;
  tools?: OpenAIChatCompletionTool[];
  /**
   * @title Top Probability
   * @description Controls the maximum probability of a single token in the generated text.
   * @default 1
   * @description 控制生成文本中最高概率的单个令牌。
   * @default 1
   */
  top_p?: number;
}
