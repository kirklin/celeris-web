import UnoCSS from "unocss/vite";
import type { PluginOption } from "vite";
import unoShareConfig from "@celeris/styles/uno.config";

export function createUnoCSSPluginConfig(): PluginOption {
  return UnoCSS({
    ...unoShareConfig,
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
  });
}
