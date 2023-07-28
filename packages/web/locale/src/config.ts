import type { I18nOptions } from "vue-i18n";
import { getLocale, setLocale } from "./store";

export interface LocalesOptions {
  locale: string;
  fallbackLocale: string;
  messagesHandler: AnyFn;
  otherOptions?: Partial<I18nOptions>;
}
export class LocalesConfiguration {
  private static options: LocalesOptions = {
    messagesHandler: () => {},
    locale: "en",
    fallbackLocale: "en",
  };

  static configure(options: Partial<LocalesOptions>): void {
    this.options = { ...this.options, ...options };
  }

  static getOptions(): LocalesOptions {
    return this.options;
  }

  static get locale(): string {
    return getLocale.value || this.options.locale;
  }

  static get fallbackLocale(): string {
    return this.options.fallbackLocale || this.locale;
  }

  static get messagesHandler() {
    return this.options.messagesHandler;
  }

  static get otherOptions() {
    return this.options.otherOptions;
  }
}

export class LocalesEngine {
  static initLocales(configureFunction: () => Partial<LocalesOptions>): void {
    LocalesConfiguration.configure(configureFunction());
  }

  static setMessagesHandler(messagesHandler: AnyFn): void {
    LocalesConfiguration.configure({ messagesHandler });
  }

  static setLocale(locale: string): void {
    setLocale(locale);
    LocalesConfiguration.configure({ locale });
  }

  static setFallbackLocale(fallbackLocale: string): void {
    LocalesConfiguration.configure({ fallbackLocale });
  }

  static setOtherOptions(otherOptions: Partial<I18nOptions>): void {
    LocalesConfiguration.configure({ otherOptions });
  }
}
