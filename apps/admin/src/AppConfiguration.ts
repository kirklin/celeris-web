import { HttpRequestEngine } from "@celeris/request";
import { createDiscreteApi } from "@celeris/ca-components";
import { field, logger } from "@celeris/utils";
import { useUserStoreWithOut } from "~/store/modules/user";
import { useNaiveUIConfigProvider } from "~/composables";

const { configProviderProps } = useNaiveUIConfigProvider();

const { message: _message, notification, dialog } = createDiscreteApi(
  ["message", "dialog", "notification", "loadingBar"],
  {
    configProviderProps,
  },
);

function initializeHttpRequest() {
  HttpRequestEngine.initRequest(() => ({
    getToken: () => {
      const userStore = useUserStoreWithOut();
      return userStore.getToken;
    },
  }));
  HttpRequestEngine.setTimeoutHandler(() => {
    const userStore = useUserStoreWithOut();
    userStore.setToken(undefined);
    userStore.logout(true).then(() => {});
  });
  HttpRequestEngine.setUnauthorizedHandler(() => {
    const userStore = useUserStoreWithOut();
    userStore.setToken(undefined);
    userStore.logout(true).then(() => {});
  });
  HttpRequestEngine.setMessageHandler((message, mode) => {
    if (mode === "message") {
      _message.info(message);
    } else if (mode === "dialog") {
      dialog.info({ title: "Information", content: message });
    } else if (mode === "notification") {
      notification.info({ title: "Information", content: message });
    } else if (mode === undefined || mode === "none") {
      logger.info(`HttpRequestEngine MessageHandler: ${message}`);
    }
  });
  HttpRequestEngine.setSuccessMessageHandler((message, mode) => {
    if (mode === "message") {
      _message.success(message);
    } else if (mode === "dialog") {
      dialog.success({ title: "Error", content: message });
    } else if (mode === "notification") {
      notification.success({ title: "Error", content: message });
    } else if (mode === undefined || mode === "none") {
      logger.info(`HttpRequestEngine SuccessHandler: ${message}`);
    }
  });
  HttpRequestEngine.setErrorMessageHandler((message, mode) => {
    if (mode === "message") {
      _message.error(message);
    } else if (mode === "dialog") {
      dialog.error({ title: "Error", content: message });
    } else if (mode === "notification") {
      notification.error({ title: "Error", content: message });
    } else if (mode === undefined || mode === "none") {
      logger.error("HttpRequestEngine ErrorHandler", field("content:", message));
    }
  });
}

export function initializeConfiguration() {
  initializeHttpRequest();
}
