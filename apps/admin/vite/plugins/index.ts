import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";

import type { ViteEnvVariables } from "../utils";
import { createMockPluginConfig } from "./mock";
import { createUnoCSSPluginConfig } from "./unocss";
import { createAutoImportPluginConfig } from "./unpluginAutoImport";
import { createVueComponentsPluginConfig } from "./unpluginVueComponets";

/**
 * Configure the Vite plugins.
 *
 * @param rootDir The root directory of the project.
 * @param viteEnv The Vite environment variables.
 * @param isProductionBuild Whether the current command is for a production build.
 */
export function configVitePlugins(
  rootDir: string,
  viteEnv: ViteEnvVariables,
  isProductionBuild: boolean,
): Array<PluginOption | PluginOption[]> {
  const vitePlugins: Array<PluginOption | PluginOption[]> = [];

  // Add the Vue plugin.
  // 添加 Vue 插件
  vitePlugins.push(vue());

  // Add the unplugin-auto-import plugin.
  // 添加 unplugin-auto-import 插件
  // https://github.com/antfu/unplugin-auto-import
  vitePlugins.push(createAutoImportPluginConfig());

  // Add the unplugin-vue-components plugin.
  // 添加 unplugin-vue-components 插件
  // https://github.com/antfu/unplugin-vue-components
  vitePlugins.push(createVueComponentsPluginConfig());

  // Add the UnoCSS plugin.
  // 添加 UnoCSS 插件
  vitePlugins.push(createUnoCSSPluginConfig());

  // vite-plugin-mock
  viteEnv.VITE_USE_MOCK && vitePlugins.push(createMockPluginConfig(isProductionBuild));

  // The following plugins only work in the production environment
  // 生产环境才会添加的插件
  if (isProductionBuild) {
    //
  }

  return vitePlugins;
}
