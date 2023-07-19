import type { ThemeSetting } from "@celeris/types";
import { presetPrimaryColors } from "@celeris/utils";

export const DEFAULT_THEME_SETTING: ThemeSetting = {
  // 网站灰色模式，开启可能是因为某些悲伤的日子
  // Whether to enable the gray mode of the website, which may be enabled due to some sad days
  shouldEnableGrayMode: false,

  // 是否开启色弱模式
  // Whether to enable the color weak mode
  shouldEnableColorWeak: false,

  // 是否开启黑暗模式
  // Whether to enable the dark mode
  shouldEnableDarkMode: false,

  // 是否开启跟随系统颜色
  // Whether to follow the system theme
  shouldFollowSystemTheme: true,

  // 主题颜色
  // The theme color
  themeColor: presetPrimaryColors.celerisBlue,

  otherColor: {
    info: presetPrimaryColors.blue,
    success: presetPrimaryColors.green,
    warning: presetPrimaryColors.orange,
    error: presetPrimaryColors.red,
  },
};
