import {
  OpenAIStream,
  StreamingTextResponse,
  experimental_StreamData,
} from "ai";
import OpenAI from "openai";
import { defineEventHandler, defineLazyEventHandler, readBody } from "h3";
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
    const { prompt } = await readBody(event);

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [{ role: "user", content: prompt }],
    });

    // optional: use stream data
    const data = new experimental_StreamData();

    data.append({ test: "value" });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response, {
      onFinal(_completion) {
        data.close();
      },
      experimental_streamData: true,
    });

    // Respond with the stream
    return new StreamingTextResponse(stream, {}, data);
  });
});
