import { OpenAIStream, StreamingTextResponse } from "ai";
import OpenAI from "openai";
import { defineEventHandler, defineLazyEventHandler, readBody } from "h3";
import { getServerConfig } from "../config/server";

export default defineLazyEventHandler(async () => {
  const { OPENAI_API_KEY } = getServerConfig();
  if (!OPENAI_API_KEY) {
    throw new Error("Missing OpenAI API key");
  }
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  return defineEventHandler(async (event: any) => {
    // Extract the `prompt` from the body of the request
    const { messages, data } = await readBody(event);

    const initialMessages = messages.slice(0, -1);
    const currentMessage = messages[messages.length - 1];

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      stream: true,
      max_tokens: 150,
      messages: [
        ...initialMessages,
        {
          ...currentMessage,
          content: [
            { type: "text", text: currentMessage.content },

            // forward the image information to OpenAI:
            {
              type: "image_url",
              image_url: data.imageUrl,
            },
          ],
        },
      ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Respond with the stream
    return new StreamingTextResponse(stream);
  });
});
