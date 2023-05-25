import { defineStore } from "pinia";
import type { DeepPartial } from "unocss";
import { APP_STORE_ID } from "@celeris/constants";
import type { HeaderSetting, MenuSetting, ProjectConfig, TransitionSetting } from "@celeris/types";
import { deepMerge } from "@celeris/utils";
import { DEFAULT_PROJECT_CONFIG } from "~/config/projectConfig";

interface AppState {
  // project config
  projectConfig: ProjectConfig;
}

export const useAppStore = defineStore({
  id: APP_STORE_ID,
  persist: {
    paths: ["projectConfig"],
  },
  state: (): AppState => ({
    projectConfig: DEFAULT_PROJECT_CONFIG,
  }),
  getters: {
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig);
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
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
    },

    setMenuSetting(menuSetting: DeepPartial<MenuSetting>): void {
      this.setProjectConfig({ menuSetting });
    },

    setHeaderSetting(headerSetting: DeepPartial<HeaderSetting>): void {
      this.setProjectConfig({ headerSetting });
    },

    setTransitionSetting(transitionSetting: DeepPartial<TransitionSetting>): void {
      this.setProjectConfig({ transitionSetting });
    },

    resetAPPState() {
      this.setProjectConfig(DEFAULT_PROJECT_CONFIG);
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
