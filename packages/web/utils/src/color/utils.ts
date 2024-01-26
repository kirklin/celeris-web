import { colord } from "colord";
import type { RgbaColor } from "colord/types";

export function isWhiteColor(color: string) {
  return colord(color).isEqual("#ffffff");
}

export function isColor(color: string) {
  return colord(color).isValid();
}

export function isBlackColor(color: string) {
  return colord(color).isEqual("#000000");
}

export function colorToRgb(color: string): RgbaColor {
  return colord(color).toRgb();
}

/**
 * Converts a color string to its RGB representation as a string.
 * 将颜色字符串转换为其 RGB 表示形式的字符串。
 *
 * @param {string} color - The color string to convert.
 *                         要转换的颜色字符串。
 * @returns {string} Returns the color represented as an RGB string.
 *                   返回表示颜色的 RGB 字符串。
 */
export function convertColorToRgbString(color: string) {
  return colord(color).toRgbString();
}

/**
 * Converts a color string to its RGB values as an array.
 * 将颜色字符串转换为其 RGB 值的数组。
 *
 * @param {string} color - The color string to convert.
 *                         要转换的颜色字符串。
 * @returns {number[]} Returns an array of RGB values [r, g, b].
 *                     返回包含 RGB 值的数组 [r, g, b]。
 */
export function convertColorToRgbValues(color: string) {
  const rgba = colord(color).toRgb();
  return [rgba.r, rgba.g, rgba.b].join(", ");
}
