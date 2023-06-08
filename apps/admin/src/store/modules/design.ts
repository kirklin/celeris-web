import type { ThemeSetting } from "@celeris/types";
import { deepMerge } from "@celeris/utils";
import { defineStore } from "pinia";
import { APP_DESIGN_STORE_ID } from "@celeris/constants";
import { DEFAULT_THEME_CONFIG } from "~/config/themeConfig";

interface DesignState {
  themeSetting: ThemeSetting;
}

export const useDesignStore = defineStore({
  id: APP_DESIGN_STORE_ID,
  persist: {
    paths: ["themeSetting"],
  },
  state: (): DesignState => ({
    themeSetting: DEFAULT_THEME_CONFIG,
  }),
  getters: {
    getThemeSetting(state): ThemeSetting {
      return state.themeSetting;
    },
  },
  actions: {
    setThemeSetting(themeSetting: Partial<ThemeSetting>): void {
      this.themeSetting = deepMerge(this.themeSetting, themeSetting);
    },

    resetThemeState() {
      this.setThemeSetting(DEFAULT_THEME_CONFIG);
    },
  },
});

// Need to be used outside the setup
export function useDesignStoreWithOut() {
  return useDesignStore(store);
}
