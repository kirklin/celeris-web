import { StreamingTextResponse } from "ai";
import { AbstractLanguageModel } from "../abstractAI";
import { ModelBrandProvider } from "../types";
import { AgentRuntimeError, LanguageModelAgentRuntimeErrorType } from "../utils";
import type { OpenAIChatMessage, OpenAIChatStreamPayload } from "../../types";

export class CelerisMockLanguageModel extends AbstractLanguageModel<any> {
  constructor() {
    super(ModelBrandProvider.Celeris);
  }

  async streamChatCompletions(messages: OpenAIChatMessage[]) {
    // 模拟将响应转换为流
    const stream = new ReadableStream({
      start(controller) {
        messages.map(message =>
          // 模拟处理消息
          controller.enqueue(`Mock completion for ${message.content}`));
        controller.close();
      },
    });

    return stream;
  }

  async chat(payload: OpenAIChatStreamPayload) {
    // ============  1. preprocess messages   ============ //
    const { messages } = payload;

    // ============  2. send api   ============ //

    try {
      const response = await this.streamChatCompletions(
        messages,
      );

      const [debug, prod] = response.tee();

      // if (DEBUG_CHAT_COMPLETION) {
      //   debugStream(debug).catch(console.error);
      // }

      return new StreamingTextResponse(prod);
    } catch (e) {
      const error = e as { [key: string]: any; code: string; message: string };

      const errorType = error.code
        ? LanguageModelAgentRuntimeErrorType.MockAIBusinessError
        : LanguageModelAgentRuntimeErrorType.AgentRuntimeError;

      throw AgentRuntimeError.chat({
        error,
        errorType,
        provider: this._brandId,
      });
    }
  }
}
