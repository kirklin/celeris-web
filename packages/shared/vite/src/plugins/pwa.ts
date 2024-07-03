/**
 * Zero-config PWA for Vite
 * https://github.com/antfu/vite-plugin-pwa
 */
import type { ViteEnvVariables } from "@celeris/types";
import { VitePWA } from "vite-plugin-pwa";

/**
 * Create PWA plugin configuration
 * 创建PWA插件配置
 * @param env Vite environment variables Vite环境变量
 * @returns Vite plugin configuration array Vite插件配置数组
 */
export function createPWAPluginConfig(env: Partial<ViteEnvVariables>) {
  const { VITE_USE_PWA, VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME } = env;

  if (VITE_USE_PWA) {
    return VitePWA({
      manifest: {
        name: VITE_GLOB_APP_TITLE,
        short_name: VITE_GLOB_APP_SHORT_NAME,
      },
    });
  }
  return [];
}
