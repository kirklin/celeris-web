import type { ComponentResolver } from "unplugin-vue-components";
import Components from "unplugin-vue-components/vite";
import type { PluginOption } from "vite";

export function createVueComponentsPluginConfig(): PluginOption {
  return Components({
    extensions: ["vue"],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: "autoResolver/components.d.ts",
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      CelerisAdminResolver(),
    ],
  });
}
/**
 * Resolver for CelerisAdmin
 *
 * @author @kirklin
 */
export function CelerisAdminResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name: string) => {
      // Resolver for Naive UI
      // @link https://www.naiveui.com/
      if (name.match(/^(N[A-Z]|n-[a-z])/)) {
        return { name, from: "@celeris/ca-components" };
      }
      if (name.match(/^(CA[A-Z]|ca-[a-z])/)) {
        return { name, from: "@celeris/components" };
      }
    },
  };
}
