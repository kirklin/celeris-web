import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
export function configUNPluginVueComponents() {
  return Components({
    extensions: ["vue"],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: "autoResolver/components.d.ts",
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      NaiveUiResolver(),
    ],
  });
}
