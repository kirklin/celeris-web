import { defineStore } from "pinia";
import type { DeepPartial } from "unocss";
import { APP_STORE_ID } from "@celeris/constants";
import type { MenuSetting, ProjectConfig, TransitionSetting } from "@celeris/types";
import { deepMerge } from "@celeris/utils";
import projectConfig from "~/config/projectConfig";

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
    projectConfig,
  }),
  getters: {
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig);
    },

    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },

    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },

  },
  actions: {
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config);
    },
    resetAPPState() {
      this.setProjectConfig(projectConfig);
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
