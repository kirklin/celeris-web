/**
 * Pinia 持久化插件
 * @link https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
 *
 */
import type { GlobEnvConfig } from "@celeris/types";
import { createStorageName } from "@celeris/utils";
import type { Pinia } from "pinia";
import destr from "destr";
import { createPersistedState } from "pinia-plugin-persistedstate";
import type { PersistedStateFactoryOptions } from "pinia-plugin-persistedstate";

export function registerPiniaPersistPlugin(pinia: Pinia) {
  pinia.use(createPersistedState(createPersistedStateOptions(createStorageName(<GlobEnvConfig>import.meta.env))));
}

export function createPersistedStateOptions(
  keyPrefix: string,
): PersistedStateFactoryOptions {
  return {
    storage: localStorage,
    key: id => `${keyPrefix}__${id}`,
    serializer: {
      deserialize: destr,
      serialize: JSON.stringify,
    },
  };
}
