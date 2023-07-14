export type ColorType = "primary" | "info" | "success" | "warning" | "error";
export type ColorTypeCase = "Primary" | "Info" | "Success" | "Warning" | "Error";
export type ColorScene = "" | "Suppl" | "Hover" | "Pressed";
export type ButtonColorScene = "" | "Hover" | "Pressed" | "Focus" | "Disabled";
export type ColorKey = `${ColorType}Color${ColorScene}`;
export type ButtonColorKey = `textColor${ButtonColorScene}${ColorTypeCase}`;
export type ThemeColor = Partial<Record<ColorKey, string>>;
export type ButtonThemeColor = Partial<Record<ColorKey, string>>;
export type ThemeConfig = {
  [key in ColorType]?: string
};

export interface ColorAction {
  scene: ColorScene;
  handler: (color: string) => string;
}
