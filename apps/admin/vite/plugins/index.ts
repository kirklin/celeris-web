import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";

import type { ViteEnv } from "../utils";
import { configUnoCSSPlugin } from "./unocss";
import { configUNPluginAutoImportPlugin } from "./unpluginAutoImport";
import { configUNPluginVueComponents } from "./unpluginVueComponets";

/**
 * Configure the Vite plugins.
 *
 * @param root The root directory of the project.
 * @param viteEnv The Vite environment variables.
 * @param isBuild Whether the current command is for a production build.
 */
export function configVitePlugins(
  root: string,
  viteEnv: ViteEnv,
  isBuild: boolean,
): Array<PluginOption | PluginOption[]> {
  const vitePlugins: Array<PluginOption | PluginOption[]> = [];
  // Add the Vue plugin.
  // 添加 Vue 插件
  vitePlugins.push(vue());
  // Add the unplugin-auto-import plugin.
  // 添加 unplugin-auto-import 插件
  // https://github.com/antfu/unplugin-auto-import
  vitePlugins.push(configUNPluginAutoImportPlugin());

  // Add the unplugin-vue-components plugin.
  // 添加 unplugin-vue-components 插件
  // https://github.com/antfu/unplugin-vue-components
  vitePlugins.push(configUNPluginVueComponents());

  // Add the UnoCSS plugin.
  // 添加 UnoCSS 插件
  vitePlugins.push(configUnoCSSPlugin());

  // The following plugins only work in the production environment
  // 生产环境才会添加的插件
  if (isBuild) {
    //
  }

  return vitePlugins;
}
