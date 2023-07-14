import { useDesignStoreWithOut } from "~/store/modules/design";

export function useThemeSetting() {
  const designStore = useDesignStoreWithOut();

  // 获取主题配置
  // get theme setting
  const getThemeSetting = () => designStore.getThemeSetting;

  // 设置主题配置
  // set theme setting
  const setThemeSetting = themeSetting => designStore.setThemeSetting(themeSetting);

  // 获取Naive UI 预设主题
  // get Naive UI preset theme
  const getNaiveUIPresetTheme = toRef(() => designStore.getNaiveUIPresetTheme);

  // 获取Naive UI 自定义主题
  // get Naive UI custom theme
  const getNaiveUICustomTheme = toRef(() => designStore.getNaiveUICustomTheme);

  // 获取暗黑模式
  // get dark mode
  const getDarkMode = toRef(() => designStore.getDarkMode);

  // 获取色弱模式
  // get color weak mode
  const getColorWeakMode = toRef(() => designStore.getColorWeakMode);

  // 获取灰色模式
  // get gray mode
  const getGrayMode = toRef(() => designStore.getGrayMode);

  // 获取跟随系统主题
  // get follow system theme
  const getFollowSystemTheme = toRef(() => designStore.getFollowSystemTheme);

  // 获取主题颜色
  // get theme color
  const getThemeColor = toRef(() => designStore.getThemeColor);

  const setDarkMode = darkMode => designStore.setDarkMode(darkMode);

  const setColorWeakMode = colorWeakMode => designStore.setColorWeakMode(colorWeakMode);

  const setGrayMode = grayMode => designStore.setGrayMode(grayMode);

  const setFollowSystemTheme = followSystemTheme => designStore.setFollowSystemTheme(followSystemTheme);

  const setThemeColor = themeColor => designStore.setThemeColor(themeColor);

  const resetDesignState = () => designStore.resetDesignState();
  return {
    getThemeSetting,
    setThemeSetting,
    getNaiveUIPresetTheme,
    getNaiveUICustomTheme,
    getDarkMode,
    getColorWeakMode,
    getGrayMode,
    getFollowSystemTheme,
    getThemeColor,
    setDarkMode,
    setColorWeakMode,
    setGrayMode,
    setFollowSystemTheme,
    setThemeColor,
    resetDesignState,
  };
}
