import type { ButtonColorScene, ColorAction, ColorType, ColorTypeCase, ThemeColor, ThemeConfig } from "@celeris/types";
import { deepMerge, generateColorPalettes } from "@celeris/utils";
import { type GlobalThemeOverrides, commonDark, commonLight } from "naive-ui";

/**
 * 将字符串的第一个字符大写
 *
 * @param {ColorType} str "primary" | "info" | "success" | "warning" | "error"
 * @return {ColorTypeCase} "Primary" | "Info" | "Success" | "Warning" | "Error"
 */
function capitalCase(str: ColorType): ColorTypeCase {
  return (str.charAt(0).toUpperCase() + str.slice(1)) as ColorTypeCase;
}

/**
 * 根据颜色获取色系
 *
 * @param {string} color 色值，如 "#1890ff"
 * @param {boolean} darkMode 是否为暗黑模式
 * @return {string[]} 色系数组
 */
function getGenerateColors(color: string, darkMode: boolean): string[] {
  return darkMode
    ? generateColorPalettes(color, true, commonDark.bodyColor)
    : generateColorPalettes(color);
}

/**
 * 获取其他组件颜色，主要用于适配暗色下文字颜色
 *
 * @desc 比如暗黑模式下Primary按钮文字、Checkbox勾号默认都是黑色的，所以需要特殊处理变成白色,可能会有遗漏，需要的话按需补充
 * @param {ThemeConfig} config 主题配置
 * @param {boolean} darkMode 是否为暗黑模式
 * @return {GlobalThemeOverrides} 主题覆盖样式
 */
function getOtherColor(
  config: ThemeConfig,
  darkMode: boolean,
): GlobalThemeOverrides {
  const otherColor: GlobalThemeOverrides = {
    Button: {},
    Checkbox: {
      checkMarkColor: getTextColor(darkMode),
    },
    DatePicker: {
      itemTextColorActive: getTextColor(darkMode),
    },
    Calendar: {
      dateTextColorCurrent: getTextColor(darkMode),
    },
    Switch: {
      buttonColor: getTextColor(darkMode),
    },
  };
  const keys = Object.keys(config) as ColorType[];
  const scenes: ButtonColorScene[] = [
    "",
    "Hover",
    "Pressed",
    "Focus",
    "Disabled",
  ];
  keys.forEach((key) => {
    scenes.forEach((scene) => {
      const colorKey = `textColor${scene}${capitalCase(key)}`;
      otherColor.Button![colorKey] = getTextColor(darkMode);
    });
  });
  return otherColor;
}

/**
 * 获取主题颜色
 *
 * @param {ThemeConfig} config 主题配置
 * @param {boolean} darkMode 是否为暗黑模式
 * @return {ThemeColor} 主题色系
 */
export function getThemeColors(
  config: ThemeConfig,
  darkMode: boolean,
): ThemeColor {
  const themeColor: ThemeColor = {};
  const keys = Object.keys(config) as ColorType[];
  const colorActions: ColorAction[] = [
    { scene: "", handler: color => getGenerateColors(color, darkMode)[5] },
    {
      scene: "Hover",
      handler: color => getGenerateColors(color, darkMode)[4],
    },
    {
      scene: "Suppl",
      handler: color => getGenerateColors(color, darkMode)[4],
    },
    {
      scene: "Pressed",
      handler: color => getGenerateColors(color, darkMode)[6],
    },
  ];
  keys.forEach((key) => {
    colorActions.forEach((action) => {
      const color = action.handler(config[key]!);
      const colorKey = `${key}Color${action.scene}`;
      themeColor[colorKey] = color;
    });
  });
  return themeColor;
}

/**
 * 获取文字颜色，主要用于适配暗黑模式文字颜色
 *
 * @param {boolean} darkMode 是否为暗黑模式
 * @return {string} 文字颜色值
 */
function getTextColor(darkMode: boolean): string {
  return darkMode ? commonDark.textColor2 : commonLight.baseColor;
}
function getOtherTheme(_darkMode: boolean): GlobalThemeOverrides {
  const naiveTheme = useThemeSetting().getNaiveUIPresetTheme.value;
  return {
    common: {
      borderRadius: "0.5rem",
      borderRadiusSmall: "0.25rem",
      cubicBezierEaseInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
      cubicBezierEaseOut: "cubic-bezier(0.33, 1, 0.68, 1)",
      cubicBezierEaseIn: "cubic-bezier(0.32, 0, 0.67, 0)",
      modalColor: naiveTheme?.common?.modalColor,
    },
    Card: {
      borderRadius: "1rem",
    },
    Statistic: {
      labelTextColor: _darkMode ? "#fff" : "#000",
      valueTextColor: _darkMode ? "#fff" : "#000",
      labelFontWeight: 400,
      valueFontWeight: 800,
    },
  };
}
/**
 * 获取Naive UI自定义主题配置
 *
 * @param {ThemeConfig} config 主题配置
 * @param {boolean} darkMode 是否为暗黑模式
 * @return {GlobalThemeOverrides} Naive UI自定义主题配置
 */
export function getNaiveUICustomTheme(
  config: ThemeConfig,
  darkMode: boolean,
): GlobalThemeOverrides {
  const themeColors = getThemeColors(config, darkMode);
  return deepMerge({
    common: {
      ...themeColors,
    },
    ...getOtherColor(config, darkMode),
  }, getOtherTheme(darkMode));
}
