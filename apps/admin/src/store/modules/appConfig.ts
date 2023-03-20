import { defineStore } from "pinia";
import type { DeepPartial } from "unocss";
import type { MenuSetting, ProjectConfig, TransitionSetting } from "@celeris/types";
import { deepMerge } from "@celeris/utils";
import projectConfig from "~/config/projectConfig";

interface AppState {
  // project config
  projectConfig: ProjectConfig;
}

export const useAppStore = defineStore({
  id: "appConfig",
  persist: {
    paths: ["projectConfig"],
  },
  state: (): AppState => ({
    projectConfig,
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig);
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
    resetProjectConfig() {
      this.setProjectConfig(projectConfig);
    },
  },
});

// Need to be used outside the setup
export function useAppStoreWithOut() {
  return useAppStore(store);
}
