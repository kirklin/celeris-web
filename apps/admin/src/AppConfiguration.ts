import { HttpRequestEngine } from "@celeris/request";
import { LocalesEngine } from "@celeris/locale";
import { createDiscreteApi } from "@celeris/ca-components";
import { field, logger } from "@celeris/utils";
import { useUserStoreWithOut } from "~/store/modules/user";
import { useAppSetting, useNaiveUIConfigProvider } from "~/composables";

function initializeHttpRequest() {
  const { configProviderProps } = useNaiveUIConfigProvider();

  const { message: _message, notification, dialog } = createDiscreteApi(
    ["message", "dialog", "notification", "loadingBar"],
    {
      configProviderProps,
    },
  );
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
      dialog.success({ title: "Success", content: message });
    } else if (mode === "notification") {
      notification.success({ title: "Success", content: message });
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

function initializeI18n() {
  const { getLocale } = useAppSetting();
  const messages = Object.fromEntries(
    Object.entries(
      import.meta.glob<{ default: any }>("./locales/*.json", { eager: true }),
    ).map(([key, value]) => {
      return [key.slice(10, -5), value.default];
    }),
  );
  LocalesEngine.initLocales(() => ({
    locale: getLocale.value,
    fallbackLocale: "en",
    messagesHandler: () => {
      return messages;
    },
    otherOptions: {
      sync: true,
      availableLocales: Object.keys(messages),
      silentTranslationWarn: true,
      missingWarn: false,
      silentFallbackWarn: true,
    },
  }));
}

export function initializeConfiguration() {
  initializeHttpRequest();
  initializeI18n();
}
