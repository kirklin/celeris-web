import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat";
import { getServerConfig } from "../config/server";

export default defineLazyEventHandler(async () => {
  const { OPENAI_API_KEY } = getServerConfig();
  console.log(OPENAI_API_KEY);
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key");
  }
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  return defineEventHandler(async (event: any) => {
    // Extract the `prompt` from the body of the request
    const { messages } = (await readBody(event)) as {
      messages: ChatCompletionMessageParam[];
    };

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages,
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  });
});
