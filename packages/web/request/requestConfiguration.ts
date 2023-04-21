import type { MessageMode } from "@celeris/types";

export interface HttpRequestOptions {
  errorMessageHandler: (message: string, mode?: MessageMode) => void;
  successMessageHandler: (message: string, mode?: MessageMode) => void;
  messageHandler: (message: string, mode?: MessageMode) => void;
  unauthorizedHandler: () => void;
  timeoutHandler: () => void;
  getToken: () => unknown;
}

export class HttpRequestConfiguration {
  private static options: HttpRequestOptions = {
    errorMessageHandler: () => {},
    successMessageHandler: () => {},
    messageHandler: () => {},
    unauthorizedHandler: () => {},
    timeoutHandler: () => {},
    getToken: () => undefined,
  };

  static configure(options: Partial<HttpRequestOptions>): void {
    this.options = { ...this.options, ...options };
  }

  static get successMessageHandler(): (message: string, mode?: MessageMode) => void {
    return this.options.successMessageHandler;
  }

  static get errorMessageHandler(): (message: string, mode?: MessageMode) => void {
    return this.options.errorMessageHandler;
  }

  static get messageHandler(): (message: string, mode?: MessageMode) => void {
    return this.options.messageHandler;
  }

  static get unauthorizedHandler(): () => void {
    return this.options.unauthorizedHandler;
  }

  static get timeoutHandler(): () => void {
    return this.options.timeoutHandler;
  }

  static get getToken(): () => unknown {
    return this.options.getToken;
  }
}

export class HttpRequestEngine {
  static initRequest(configureFunction: () => Partial<HttpRequestOptions>): void {
    HttpRequestConfiguration.configure(configureFunction());
  }

  static setMessageHandler(messageHandler: (message: string, mode?: MessageMode) => void): void {
    HttpRequestConfiguration.configure({ messageHandler });
  }

  static setSuccessMessageHandler(successMessageHandler: (message: string, mode?: MessageMode) => void): void {
    HttpRequestConfiguration.configure({ successMessageHandler });
  }

  static setErrorMessageHandler(errorMessageHandler: (message: string, mode?: MessageMode) => void): void {
    HttpRequestConfiguration.configure({ errorMessageHandler });
  }

  static setUnauthorizedHandler(unauthorizedHandler: () => void): void {
    HttpRequestConfiguration.configure({ unauthorizedHandler });
  }

  static setTimeoutHandler(timeoutHandler: () => void): void {
    HttpRequestConfiguration.configure({ timeoutHandler });
  }
}
