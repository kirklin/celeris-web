import type { PluginOption } from "vite";
import VueDevTools from "vite-plugin-vue-devtools";

export function createVueDevToolsPluginConfig(): PluginOption {
  // https://github.com/webfansplz/vite-plugin-vue-devtools
  return VueDevTools();
}
