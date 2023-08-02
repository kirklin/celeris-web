import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from "unocss";
import UnoCSS from "unocss/vite";
import presetChinese from "unocss-preset-chinese";
import type { PluginOption } from "vite";

export function createUnoCSSPluginConfig(): PluginOption {
  return UnoCSS({
    content: {
      pipeline: {
        exclude: ["node_modules", ".git", "dist"],
      },
    },
    presets: [
      presetUno({ dark: "class" }),
      presetAttributify(),
      presetChinese(),
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
    ],
    shortcuts: {
      // position
      "pr": "relative",
      "pa": "absolute",
      "pf": "fixed",
      "ps": "sticky",

      // position layout
      "position-x-center": "absolute left-1/2 -translate-x-1/2",
      "pxc": "position-x-center",
      "position-y-center": "absolute top-1/2 -translate-y-1/2",
      "pyc": "position-y-center",
      "position-center": "position-x-center position-y-center",
      "pc": "position-center",

      // size
      "size-0": "w-0 h-0",
      "size-full": "w-full h-full",
      "size-screen": "w-screen h-screen",
      "size-1/2": "w-1/2 h-1/2",

      // flex layout
      "flex-center": "flex justify-center items-center",
      "flex-col-center": "flex-center flex-col",
      "flex-x-center": "flex justify-center",
      "flex-y-center": "flex items-center",
    },
    theme: {
      colors: {
        primary: "rgb(var(--primary-color))",
        primary_hover: "rgb(var(--primary-color-hover))",
        primary_suppl: "rgb(var(--primary-color-suppl))",
        primary_pressed: "rgb(var(--primary-color-pressed))",
        primary_1: "rgb(var(--primary-color1))",
        primary_2: "rgb(var(--primary-color2))",
        primary_3: "rgb(var(--primary-color3))",
        primary_4: "rgb(var(--primary-color4))",
        primary_5: "rgb(var(--primary-color5))",
        primary_6: "rgb(var(--primary-color6))",
        primary_7: "rgb(var(--primary-color7))",
        primary_8: "rgb(var(--primary-color8))",
        primary_9: "rgb(var(--primary-color9))",
        primary_10: "rgb(var(--primary-color10))",
        info: "rgb(var(--info-color))",
        info_hover: "rgb(var(--info-color-hover))",
        info_suppl: "rgb(var(--info-color-suppl))",
        info_pressed: "rgb(var(--info-color-pressed))",
        success: "rgb(var(--success-color))",
        success_hover: "rgb(var(--success-color-hover))",
        success_suppl: "rgb(var(--success-color-suppl))",
        success_pressed: "rgb(var(--success-color-pressed))",
        warning: "rgb(var(--warning-color))",
        warning_hover: "rgb(var(--warning-color-hover))",
        warning_suppl: "rgb(var(--warning-color-suppl))",
        warning_pressed: "rgb(var(--warning-color-pressed))",
        error: "rgb(var(--error-color))",
        error_hover: "rgb(var(--error-color-hover))",
        error_suppl: "rgb(var(--error-color-suppl))",
        error_pressed: "rgb(var(--error-color-pressed))",
      },
      // https://github.com/ai/easings.net
      transitionTimingFunction: {
        "css": "ease",
        "css-in": "ease-in",
        "css-out": "ease-out",
        "css-in-out": "ease-in-out",
        "in-sine": "cubic-bezier(0.12, 0, 0.39, 0)",
        "out-sine": "cubic-bezier(0.61, 1, 0.88, 1)",
        "in-out-sine": "cubic-bezier(0.37, 0, 0.63, 1)",
        "in-quad": "cubic-bezier(0.11, 0, 0.5, 0)",
        "out-quad": "cubic-bezier(0.5, 1, 0.89, 1)",
        "in-out-quad": "cubic-bezier(0.45, 0, 0.55, 1)",
        "in-cubic": "cubic-bezier(0.32, 0, 0.67, 0)",
        "out-cubic": "cubic-bezier(0.33, 1, 0.68, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
        "in-quart": "cubic-bezier(0.5, 0, 0.75, 0)",
        "out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
        "in-out-quart": "cubic-bezier(0.76, 0, 0.24, 1)",
        "in-quint": "cubic-bezier(0.64, 0, 0.78, 0)",
        "out-quint": "cubic-bezier(0.22, 1, 0.36, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
        "in-circ": "cubic-bezier(0.55, 0, 1, 0.45)",
        "out-circ": "cubic-bezier(0, 0.55, 0.45, 1)",
        "in-out-circ": "cubic-bezier(0.85, 0, 0.15, 1)",
        "in-back": "cubic-bezier(0.36, 0, 0.66, -0.56)",
        "out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "in-out-back": "cubic-bezier(0.68, -0.6, 0.32, 1.6)",
      },
    },
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  });
}
