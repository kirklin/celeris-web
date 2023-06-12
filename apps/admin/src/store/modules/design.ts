import type { ThemeSetting } from "@celeris/types";
import { deepMerge } from "@celeris/utils";
import { defineStore } from "pinia";
import { APP_DESIGN_STORE_ID } from "@celeris/constants";
import type { GlobalTheme } from "naive-ui";
import { darkTheme, useOsTheme } from "naive-ui";
import { DEFAULT_THEME_SETTING } from "~/setting/themeSetting";

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
    //  获取主题设置
    getThemeSetting(state): ThemeSetting {
      return state.themeSetting;
    },
    //   获取Naive UI 预设主题
    getNaivePresetTheme(state): GlobalTheme | null {
      if (state.themeSetting.shouldFollowSystemTheme) {
        return useOsTheme().value === "dark" ? darkTheme : null;
      }
      return state.themeSetting.shouldEnableDarkMode ? darkTheme : null;
    },
    //  获取暗黑模式
    getDarkMode(state): boolean {
      return state.themeSetting.shouldEnableDarkMode;
    },
    //  获取色弱模式
    getColorWeakMode(state): boolean {
      return state.themeSetting.shouldEnableColorWeak;
    },
    //  获取灰色模式
    getGrayMode(state): boolean {
      return state.themeSetting.shouldEnableGrayMode;
    },
    //  获取跟随系统主题
    getFollowSystemTheme(state): boolean {
      return state.themeSetting.shouldFollowSystemTheme;
    },
    //  获取主题颜色
    getThemeColor(state): string {
      return state.themeSetting.themeColor;
    },
  },
  actions: {
    // 设置主题
    setThemeSetting(themeSetting: Partial<ThemeSetting>): void {
      this.themeSetting = deepMerge(this.themeSetting, themeSetting);
    },
    // 设置暗黑模式
    setDarkMode(darkMode: boolean): void {
      this.setThemeSetting({ shouldEnableDarkMode: darkMode });
    },
    // 设置色弱模式
    setColorWeakMode(colorWeakMode: boolean): void {
      this.setThemeSetting({ shouldEnableColorWeak: colorWeakMode });
    },
    // 设置灰色模式
    setGrayMode(grayMode: boolean): void {
      this.setThemeSetting({ shouldEnableGrayMode: grayMode });
    },
    // 设置跟随系统主题
    setFollowSystemTheme(followSystemTheme: boolean): void {
      this.setThemeSetting({ shouldFollowSystemTheme: followSystemTheme });
    },
    // 设置主题颜色
    setThemeColor(themeColor: string): void {
      this.setThemeSetting({ themeColor });
    },
    // 重置状态
    resetDesignState() {
      this.setThemeSetting(DEFAULT_THEME_SETTING);
    },
  },
});

// Need to be used outside the setup
export function useDesignStoreWithOut() {
  return useDesignStore(store);
}
