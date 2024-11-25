import type { PluginOption } from "vite";
import AutoImport from "unplugin-auto-import/vite";

export function createAutoImportPluginConfig(): PluginOption {
  // https://github.com/antfu/unplugin-auto-import
  return AutoImport({
    imports: [
      "vue",
      "vue-router",
      "vue-i18n",
      "@vueuse/core",
      {
        "@celeris/ca-components": [
          "useDialog",
          "useMessage",
          "useNotification",
          "useLoadingBar",
        ],
      },
      {
        "@celeris/hooks": [
          "useComponentRef",
          "useMergeState",
          "useScreen",
          "useState",
        ],
      },
    ],
    dts: "autoResolver/auto-imports.d.ts",
    dirs: [
      "src/composables",
      "src/store",
    ],
    vueTemplate: true,
  });
}
