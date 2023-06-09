import { defineStore } from "pinia";
import type { DeepPartial } from "unocss";
import { APP_STORE_ID } from "@celeris/constants";
import type { HeaderSetting, MenuSetting, ProjectSetting, TransitionSetting } from "@celeris/types";
import { deepMerge } from "@celeris/utils";
import { DEFAULT_PROJECT_SETTING } from "~/config/projectSetting";

interface AppState {
  // project config
  projectConfig: ProjectSetting;
}

export const useAppStore = defineStore({
  id: APP_STORE_ID,
  persist: {
    paths: ["projectConfig"],
  },
  state: (): AppState => ({
    projectConfig: DEFAULT_PROJECT_SETTING,
  }),
  getters: {
    getProjectConfig(state): ProjectSetting {
      return state.projectConfig || ({} as ProjectSetting);
    },

    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },

    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },

    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },

  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectSetting>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
    },

    setMenuSetting(menuSetting: Partial<MenuSetting>): void {
      this.setProjectConfig({ menuSetting });
    },

    setHeaderSetting(headerSetting: Partial<HeaderSetting>): void {
      this.setProjectConfig({ headerSetting });
    },

    setTransitionSetting(transitionSetting: Partial<TransitionSetting>): void {
      this.setProjectConfig({ transitionSetting });
    },

    resetAPPState() {
      this.setProjectConfig(DEFAULT_PROJECT_SETTING);
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
