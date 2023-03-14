import Inspector from "vite-plugin-vue-inspector";
export function createInspectorPluginConfig() {
  // https://github.com/webfansplz/vite-plugin-vue-inspector
  return Inspector({
    toggleButtonVisibility: "never",
  });
}
