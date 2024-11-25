import type { VueQueryPluginOptions } from "@tanstack/vue-query";
import type { App } from "vue";
import { persistQueryClient } from "@tanstack/query-persist-client-core";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { VueQueryPlugin } from "@tanstack/vue-query";

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
