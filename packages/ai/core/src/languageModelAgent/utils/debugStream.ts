import { logger } from "@celeris/utils";

export async function debugStream(stream: ReadableStream) {
  let done = false;
  let chunk = 0;
  const decoder = new TextDecoder();

  const reader = stream.getReader();
  while (!done) {
    const { value, done: _done } = await reader.read();
    const chunkValue = decoder.decode(value, { stream: true });
    if (!_done) {
      logger.info(`debugStream- chunk ${chunk}: ${chunkValue}`);
    }

    done = _done;
    chunk++;
  }
}
