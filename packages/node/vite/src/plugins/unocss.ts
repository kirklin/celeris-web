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
      presetUno(),
      presetAttributify(),
      presetChinese(),
      presetIcons({
        scale: 1.2,
        warn: true,
      }),
    ],
    transformers: [
      transformerDirectives(),
      transformerVariantGroup(),
    ],
  });
}
