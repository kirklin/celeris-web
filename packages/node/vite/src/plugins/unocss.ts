import { presetAttributify, presetIcons, presetUno, transformerDirectives, transformerVariantGroup } from "unocss";
import UnoCSS from "unocss/vite";
import presetChinese, { chineseTypography } from "unocss-preset-chinese";
import presetEase from "unocss-preset-ease";
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
      chineseTypography(),
      presetChinese({
        chineseType: "simplified",
      }),
      presetEase(),
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
    ],
    shortcuts: {
      // position
      "common-bg": "bg-gray-100 dark:bg-gray-900",
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
        primary: "var(--primary-color)",
        primary_hover: "var(--primary-color-hover)",
        primary_suppl: "var(--primary-color-suppl)",
        primary_pressed: "var(--primary-color-pressed)",
        primary_1: "var(--primary-color-1)",
        primary_2: "var(--primary-color-2)",
        primary_3: "var(--primary-color-3)",
        primary_4: "var(--primary-color-4)",
        primary_5: "var(--primary-color-5)",
        primary_6: "var(--primary-color-6)",
        primary_7: "var(--primary-color-7)",
        primary_8: "var(--primary-color-8)",
        primary_9: "var(--primary-color-9)",
        primary_10: "var(--primary-color10)",
        action: "var(--action-color)",
        info: "var(--info-color)",
        info_hover: "var(--info-color-hover)",
        info_suppl: "var(--info-color-suppl)",
        info_pressed: "var(--info-color-pressed)",
        success: "var(--success-color)",
        success_hover: "var(--success-color-hover)",
        success_suppl: "var(--success-color-suppl)",
        success_pressed: "var(--success-color-pressed)",
        warning: "var(--warning-color))",
        warning_hover: "var(--warning-color-hover)",
        warning_suppl: "var(--warning-color-suppl)",
        warning_pressed: "var(--warning-color-pressed)",
        error: "var(--error-color))",
        error_hover: "var(--error-color-hover)",
        error_suppl: "var(--error-color-suppl)",
        error_pressed: "var(--error-color-pressed)",
      },
    },
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  });
}
