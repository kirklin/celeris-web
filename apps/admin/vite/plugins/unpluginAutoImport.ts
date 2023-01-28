import AutoImport from "unplugin-auto-import/vite";
export function configUNPluginAutoImportPlugin() {
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
    ],
    dts: "autoResolver/auto-imports.d.ts",
    dirs: [
      "src/composables",
      "src/store",
    ],
    vueTemplate: true,
  });
}
