import type { ThemeSetting } from "@celeris/types";
import { deepMerge } from "@celeris/utils";
import { defineStore } from "pinia";
import { APP_DESIGN_STORE_ID } from "@celeris/constants";
import { DEFAULT_THEME_SETTING } from "~/config/themeSetting";

interface DesignState {
  themeSetting: ThemeSetting;
}

export const useDesignStore = defineStore({
  id: APP_DESIGN_STORE_ID,
  persist: {
    paths: ["themeSetting"],
  },
  state: (): DesignState => ({
    themeSetting: DEFAULT_THEME_SETTING,
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

    resetDesignState() {
      this.setThemeSetting(DEFAULT_THEME_SETTING);
    },
  },
});

// Need to be used outside the setup
export function useDesignStoreWithOut() {
  return useDesignStore(store);
}
