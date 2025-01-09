import type { RouteLocationNormalized, Router } from "vue-router";

import type { Tab } from "~/store/modules/tabs";
import { unref } from "vue";
import { useRouter } from "vue-router";
import { useTabsStore } from "~/store/modules/tabs";

export function useTabs(_router?: Router) {
  const tabStore = useTabsStore();
  const router = _router || useRouter();

  const { currentRoute } = router;

  function getCurrentTab() {
    const route = unref(currentRoute);
    return tabStore.getTabsList.find(item => item.fullPath === route.fullPath)!;
  }

  return {
    getTabsList: () => tabStore.getTabsList,
    getPinnedTabsList: () => tabStore.getPinnedTabsList,
    getLimitTabsList: () => tabStore.getLimitTabsList,
    closeTab: (tab: Tab) => tabStore.closeTab(tab),
    closePinnedTab: (tab: Tab) => tabStore.closePinnedTab(tab),
    addTab: (route: RouteLocationNormalized) => tabStore.addTab(route),
    pinnedTab: (tab: Tab) => tabStore.pinnedTab(tab),
    getCurrentTab,
  };
}
