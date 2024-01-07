import { colord } from "colord";
import type { RgbaColor } from "colord/types";

export function isWhiteColor(color: string) {
  return colord(color).isEqual("#ffffff");
}

export function isBlackColor(color: string) {
  return colord(color).isEqual("#000000");
}

export function colorToRgb(color: string): RgbaColor {
  return colord(color).toRgb();
}

export function colorToRgbString(color: string) {
  const rgba = colord(color).toRgb();
  return [rgba.r, rgba.g, rgba.b].join(", ");
}
