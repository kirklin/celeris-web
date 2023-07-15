import { colord } from "colord";

export function isWhiteColor(color: string) {
  return colord(color).isEqual("#ffffff");
}
