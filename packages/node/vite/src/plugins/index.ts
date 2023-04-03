import type { ViteEnvVariables } from "@celeris/types";
import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";

import { createConfigPluginConfig } from "./generateConfig";
import { createInspectPluginConfig } from "./inspect";
import { createInspectorPluginConfig } from "./inspector";
import { createMockPluginConfig } from "./mock";
import { createPWAPluginConfig } from "./pwa";
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
  viteEnv: Partial<ViteEnvVariables>,
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

  // Add the GenerateConfig plugin.
  // 添加 生成配置 插件
  vitePlugins.push(createConfigPluginConfig());

  // Add the mock plugin.
  // 添加 mock 插件
  viteEnv.VITE_USE_MOCK && vitePlugins.push(createMockPluginConfig(isProductionBuild));

  // Add the vite-plugin-inspect
  // https://github.com/antfu/vite-plugin-inspect
  // Visit http://localhost:3333/__inspect/ to see the inspector
  vitePlugins.push(createInspectPluginConfig());

  // Add the vite-plugin-inspector
  // https://github.com/webfansplz/vite-plugin-vue-inspector
  vitePlugins.push(createInspectorPluginConfig());

  // The following plugins only work in the production environment
  // 生产环境才会添加的插件
  if (isProductionBuild) {
    // Add the vite-plugin-pwa
    // 添加 PWA 插件
    vitePlugins.push(createPWAPluginConfig(viteEnv));
  }

  return vitePlugins;
}
