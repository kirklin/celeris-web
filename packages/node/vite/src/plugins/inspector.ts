import type { PluginOption } from "vite";
import Inspector from "vite-plugin-vue-inspector";

export function createInspectorPluginConfig(): PluginOption {
  // https://github.com/webfansplz/vite-plugin-vue-inspector
  return Inspector({
    toggleButtonVisibility: "never",
  });
}
