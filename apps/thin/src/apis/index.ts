import type { App } from "vue";
import type { VueQueryPluginOptions } from "@tanstack/vue-query";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const vueQueryOptions: VueQueryPluginOptions = {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60 * 24,
      },
    },
  },
  clientPersister: (queryClient) => {
    return persistQueryClient({
      queryClient,
      persister: createSyncStoragePersister({ storage: localStorage }),
    });
  },
};

export function setupVueQuery(app: App<Element>) {
  app.use(VueQueryPlugin, vueQueryOptions);
}
