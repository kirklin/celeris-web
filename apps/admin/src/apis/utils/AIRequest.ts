export class AIRequest {
  private baseUrl: string;
  private apiKey?: string;
  constructor(apiKey?: string, baseUrl: string = "ai-openai/api/chat/") {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async chat(payload = {}, provider = "celeris") {
    const url = `${this.baseUrl}${provider}`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "x-celeris-chat-auth": "CELERIS_CHAT_AUTH_HEADER",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(payload), // body data type must match "Content-Type" header
    });

    if (!response.ok) {
      throw new Error(`AI request failed with status ${response.status}`);
    }

    return response;
  }
}
