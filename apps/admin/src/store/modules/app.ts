import { defineStore } from "pinia";
import type { DeepPartial } from "unocss";
import { APP_STORE_ID } from "@celeris/constants";
import type { HeaderSetting, MenuSetting, ProjectSetting, TransitionSetting } from "@celeris/types";
import { deepMerge } from "@celeris/utils";
import { resetRouter } from "~/router";
import { DEFAULT_PROJECT_SETTING } from "~/setting/projectSetting";

interface AppState {
  // project config
  projectSetting: ProjectSetting;
  // Page loading status
  pageLoading: boolean;
}

let pageLoadingTimeout: ReturnType<typeof setTimeout>;
export const useAppStore = defineStore({
  id: APP_STORE_ID,
  persist: {
    paths: ["projectSetting"],
  },
  state: (): AppState => ({
    projectSetting: DEFAULT_PROJECT_SETTING,
    pageLoading: false,
  }),
  getters: {
    getPageLoading(state): boolean {
      return state.pageLoading;
    },

    getProjectSetting(state): ProjectSetting {
      return state.projectSetting || ({} as ProjectSetting);
    },

    getMenuSetting(): MenuSetting {
      return this.getProjectSetting.menuSetting;
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectSetting.headerSetting;
    },

    getTransitionSetting(): TransitionSetting {
      return this.getProjectSetting.transitionSetting;
    },

  },
  actions: {
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    setProjectSetting(config: DeepPartial<ProjectSetting>): void {
      this.projectSetting = deepMerge(this.projectSetting || {}, config);
    },

    setMenuSetting(menuSetting: Partial<MenuSetting>): void {
      this.setProjectSetting({ menuSetting });
    },

    setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
      this.setProjectSetting({ headerSetting });
    },

    setTransitionSetting(transitionSetting: Partial<TransitionSetting>): void {
      this.setProjectSetting({ transitionSetting });
    },

    setPageLoadingAction(loading: boolean) {
      clearTimeout(pageLoadingTimeout);
      if (loading) {
        // Prevent flicker by delaying the setPageLoading call
        pageLoadingTimeout = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
      }
    },

    resetAPPState() {
      resetRouter();
      this.setProjectSetting(DEFAULT_PROJECT_SETTING);
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
