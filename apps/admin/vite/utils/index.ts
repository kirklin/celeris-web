// App Environment Variables
export interface ViteEnvVariables {
  NODE_ENV: string;

  // Whether to use mock data
  // 是否使用模拟数据
  VITE_USE_MOCK: boolean;

  // Whether to enable PWA
  // 是否开启 PWA
  VITE_USE_PWA: boolean;

  // The public path when deployed
  // 部署时的公共路径
  VITE_PUBLIC_PATH: string;

  // Proxy configuration
  // 代理配置
  VITE_PROXY: [string, string][];

  // Website title
  // 网站标题
  VITE_GLOB_APP_TITLE: string;

  // Website short name
  // 网站短名称
  VITE_GLOB_APP_SHORT_NAME: string;

  // Whether to use CDN acceleration
  // 是否使用 CDN 加速
  VITE_USE_CDN: boolean;

  // Whether to remove console in production environment
  // 是否在生产环境中去除 console
  VITE_DROP_CONSOLE: boolean;

  // Whether to enable https
  // 是否启用 https
  VITE_USE_HTTPS: boolean;

  // Whether to compress build products
  // 是否压缩构建产物
  VITE_BUILD_COMPRESS: "gzip" | "brotli" | "none";

  // Whether to delete the original file after compression
  // 是否删除原始文件
  VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;

  // Whether to support legacy browsers
  // 是否兼容老版本浏览器
  VITE_LEGACY: boolean;

  // Whether to enable image compression
  // 是否启用图片压缩
  VITE_USE_IMAGEMIN: boolean;
}

/**
 * Read all environment variable configuration files and add them to process.env
 *
 * @param envConf Object containing environment variable configuration
 * @returns Object with the updated environment variables
 */
export function updateEnvVariables(envConf: Record<string, any>): ViteEnvVariables {
  const viteEnv: Partial<ViteEnvVariables> = {};

  for (const key of Object.keys(envConf)) {
    let realName = envConf[key].replace(/\\n/g, "\n");
    realName
      = realName === "true" ? true : realName === "false" ? false : realName;

    viteEnv[key] = realName;
    if (typeof realName === "string") {
      process.env[key] = realName;
    } else if (typeof realName === "object") {
      process.env[key] = JSON.stringify(realName);
    }
  }
  return viteEnv as ViteEnvVariables;
}
