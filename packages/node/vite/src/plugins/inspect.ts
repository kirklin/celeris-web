import Inspect from "vite-plugin-inspect";
export function createInspectPluginConfig() {
  // https://github.com/antfu/vite-plugin-inspect
  // Visit http://localhost:3333/__inspect/ to see the inspector
  return Inspect();
}
