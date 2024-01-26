import { defineStore } from "pinia";
import { APP_TABS_STORE_ID, PageConstants } from "@celeris/constants";
import { isGreaterOrEqual2xl } from "@celeris/hooks";
import type { RouteLocationNormalized, RouteRecordName } from "vue-router";
import { takeRight, uniqBy } from "@celeris/utils";
import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from "~/router/routes/basic";

interface AppTabsState {
  tabs: Tab[];
  pinnedTabs: Tab[];
  maxVisibleTabs: number;
}
export interface Tab {
  name: RouteRecordName;
  fullPath: string;
  title: string;
}
export const useTabsStore = defineStore({
  id: APP_TABS_STORE_ID,
  persist: [{
    paths: ["pinnedTabs"],
    storage: localStorage,
  }, {
    paths: ["tabs"],
    storage: sessionStorage,
  }],
  state: (): AppTabsState => ({
    tabs: [],
    pinnedTabs: [],
    maxVisibleTabs: 3,
  }),
  getters: {
    getTabsList(state): Tab[] {
      return state.tabs;
    },
    getLimitTabsList(state): Tab[] {
      if (isGreaterOrEqual2xl.value) {
        state.maxVisibleTabs = 3;
      } else {
        state.maxVisibleTabs = 1;
      }
      return takeRight(
        state.tabs.filter(tab => state.pinnedTabs.findIndex(p => p.fullPath === tab.fullPath) === -1).reverse(),
        state.maxVisibleTabs,
      );
    },
    getPinnedTabsList(state): Tab[] {
      return state.pinnedTabs;
    },
  },
  actions: {
    addTab(route: RouteLocationNormalized) {
      const { path, name, meta } = route;
      if (!name || path === PageConstants.ERROR_PAGE || path === PageConstants.BASE_LOGIN || [REDIRECT_ROUTE.name, PAGE_NOT_FOUND_ROUTE.name].includes(name)) {
        return;
      }
      const title = meta?.title as string || name.toString().split("-").at(-1);
      if (title) {
        const newTab: Tab = { name, fullPath: route.fullPath, title };
        this.tabs = uniqBy([newTab, ...this.tabs], "fullPath");
      }
    },
    close(isPinned: boolean, tab: Tab) {
      const targetTabs = isPinned ? this.pinnedTabs : this.tabs;
      this.tabs = targetTabs.filter(currentTab => currentTab.fullPath !== tab.fullPath);
    },
    closeTab(tab: Tab) {
      this.close(false, tab);
    },
    closePinnedTab(tab: Tab) {
      this.close(true, tab);
    },
    pinnedTab(tab: Tab) {
      const isPresent = this.pinnedTabs.some(pinnedTab => pinnedTab.fullPath === tab.fullPath);
      if (!isPresent) {
        this.pinnedTabs = [tab, ...this.pinnedTabs];
      }
      return true;
    },
    resetTabsState() {
      this.tabs = [];
      this.pinnedTabs = [];
    },
  },
});

// Need to be used outside the setup
export function useTabsStoreWithOut() {
  return useTabsStore(store);
}
