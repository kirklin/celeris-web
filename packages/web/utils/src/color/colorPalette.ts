import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import mixPlugin from "colord/plugins/mix";
import type { AnyColor, HsvColor } from "colord";

extend([namesPlugin, mixPlugin]);

/**
 * 色相阶梯
 * Hue step for generating color palette
 */
const HUE_STEP = 2;

/**
 * 饱和度阶梯，浅色部分
 * Saturation step for light colors
 */
const LIGHT_SATURATION_STEP = 16;

/**
 * 饱和度阶梯，深色部分
 * Saturation step for dark colors
 */
const DARK_SATURATION_STEP = 5;

/**
 * 亮度阶梯，浅色部分
 * Brightness step for light colors
 */
const LIGHT_BRIGHTNESS_STEP = 5;

/**
 * 亮度阶梯，深色部分
 * Brightness step for dark colors
 */
const DARK_BRIGHTNESS_STEP = 15;

/**
 * 主色号
 * Index of main color
 */
const MAIN_COLOR_INDEX = 6;

/**
 * 浅色数量，主色上
 * Number of light colors above the main color
 */
const LIGHT_COLOR_COUNT_ABOVE_MAIN = 5;

/**
 * 深色数量，主色下
 * Number of dark colors below the main color
 */
const DARK_COLOR_COUNT_BELOW_MAIN = 4;

/**
 * 调色板的颜色索引
 * Color index for generating color palette
 * @description Colors are arranged from left to right, from light to dark, with 6 being the main color
 * @description 从左至右颜色从浅到深，6为主色号
 */
type ColorIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

/**
 * 根据颜色和索引生成调色板颜色
 * Generate color palette based on the color and index
 * @param color - 颜色 The color
 * @param index - 调色板的对应的色号(6为主色号) The index of the color in the palette (6 for the main color)
 * @returns 返回hex格式的颜色 The hex color value
 */
export function generateColorPalette(color: AnyColor, index: ColorIndex): string {
  const transformedColor = colord(color);

  // 判断输入值是否有效
  if (!transformedColor.isValid()) {
    throw new Error("Invalid input color value");
  }

  if (index === MAIN_COLOR_INDEX) {
    return colord(transformedColor).toHex();
  }

  const isLight = index < MAIN_COLOR_INDEX;
  const hsv = transformedColor.toHsv();
  const i = isLight ? LIGHT_COLOR_COUNT_ABOVE_MAIN + 1 - index : index - LIGHT_COLOR_COUNT_ABOVE_MAIN - 1;

  const newHsv: HsvColor = {
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight),
  };

  return colord(newHsv).toHex();
}

/**
 * 暗色主题颜色映射关系表
 * Mapping of dark theme color opacity
 */
const DARK_COLOR_MAP = [
  { index: 7, opacity: 0.15 },
  { index: 6, opacity: 0.25 },
  { index: 5, opacity: 0.3 },
  { index: 5, opacity: 0.45 },
  { index: 5, opacity: 0.65 },
  { index: 5, opacity: 0.85 },
  { index: 4, opacity: 0.9 },
  { index: 3, opacity: 0.95 },
  { index: 2, opacity: 0.97 },
  { index: 1, opacity: 0.98 },
];

/**
 * 根据颜色生成调色板的所有颜色
 * Generate all colors of the color palette based on the color
 * @param color - The color
 * @param darkTheme - Whether to generate colors for a dark theme
 * @param darkThemeMixColor - The mix color for the dark theme, default is #141414
 * @returns The array of hex color values
 */
export function generateColorPalettes(color: AnyColor, darkTheme = false, darkThemeMixColor = "#141414"): string[] {
  const indexes: ColorIndex[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const patterns = indexes.map(index => generateColorPalette(color, index));

  if (darkTheme) {
    const darkPatterns = DARK_COLOR_MAP.map(({ index, opacity }) => {
      const darkColor = colord(darkThemeMixColor).mix(patterns[index], opacity);

      return darkColor;
    });

    return darkPatterns.map(item => colord(item).toHex());
  }

  return patterns;
}

/**
 * 获取色相的渐变值
 * Get the hue value for gradient
 * @param hsv - The hsv color value
 * @param i - 与主色号的相对距离 The relative distance to the main color
 * @param isLight - Whether it is a light color
 * @returns 返回色相的渐变值 The hue value for gradient
 */
function getHue(hsv: HsvColor, i: number, isLight: boolean): number {
  let hue: number;

  const hsvH = Math.round(hsv.h);

  if (hsvH >= 60 && hsvH <= 240) {
    // 冷色调
    // 减淡变亮 色相顺时针旋转 更暖
    // 加深变暗 色相逆时针旋转 更冷
    // Cool colors
    // Lightening brightens the color by rotating the hue clockwise, making it warmer
    // Darkening darkens the color by rotating the hue counterclockwise, making it cooler
    hue = isLight ? hsvH - HUE_STEP * i : hsvH + HUE_STEP * i;
  } else {
    // 暖色调
    // 减淡变亮 色相逆时针旋转 更暖
    // 加深变暗 色相顺时针旋转 更冷
    // Warm colors
    // Lightening brightens the color by rotating the hue counterclockwise, making it warmer
    // Darkening darkens the color by rotating the hue clockwise, making it cooler
    hue = isLight ? hsvH + HUE_STEP * i : hsvH - HUE_STEP * i;
  }

  return (hue % 360 + 360) % 360;
}

/**
 * 获取饱和度的渐变值
 * Get the saturation value for gradient
 * @param hsv - The hsv color value
 * @param i - 与主色号的相对距离 The relative distance to the main color
 * @param isLight - Whether it is a light color
 * @returns The saturation value for gradient
 */
function getSaturation(hsv: HsvColor, i: number, isLight: boolean): number {
  // 灰度颜色不做渐变
  // Do not gradient grayscale colors
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }

  let saturation: number;

  if (isLight) {
    saturation = hsv.s - LIGHT_SATURATION_STEP * i;
  } else if (i === DARK_COLOR_COUNT_BELOW_MAIN) {
    saturation = hsv.s + LIGHT_SATURATION_STEP;
  } else {
    saturation = hsv.s + DARK_SATURATION_STEP * i;
  }

  saturation = Math.max(6, Math.min(saturation, 100));

  if (isLight && i === LIGHT_COLOR_COUNT_ABOVE_MAIN) {
    saturation = Math.min(saturation, 10);
  }

  return saturation;
}

/**
 * 获取明度的渐变值
 * Get the brightness value for gradient
 * @param hsv - The hsv color value
 * @param i - 与主色号的相对距离 The relative distance to the main color
 * @param isLight - Whether it is a light color
 * @returns 返回明度的渐变值 The brightness value for gradient
 */
function getValue(hsv: HsvColor, i: number, isLight: boolean): number {
  let value: number;

  if (isLight) {
    value = hsv.v + LIGHT_BRIGHTNESS_STEP * i;
  } else {
    value = hsv.v - DARK_BRIGHTNESS_STEP * i;
  }

  return Math.min(100, value);
}
