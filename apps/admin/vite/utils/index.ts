import type { ProxyOptions } from "vite";

// App Environment Variables
// 应用程序环境变量
export interface ViteEnvVariables {

  // Node environment type
  // Node环境类型
  NODE_ENV: string;

  // Vite configuration port number
  // Vite配置端口号
  VITE_PORT: number;

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

    // Convert string "true" and "false" to boolean values
    if (realName === "true") {
      realName = true;
    } else if (realName === "false") {
      realName = false;
    }
    // Convert VITE_PORT to a number
    if (key === "VITE_PORT") {
      realName = Number(realName);
    }

    if (key === "VITE_PROXY" && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, "\""));
      } catch (error) {
        realName = null;
      }
    }

    // Set the value of the environment variable
    if (realName !== null && typeof realName !== "undefined") {
      viteEnv[key] = realName;
      if (typeof realName === "string") {
        process.env[key] = realName;
      } else {
        process.env[key] = JSON.stringify(realName);
      }
    }
  }
  return viteEnv as ViteEnvVariables;
}

/**
 * 根据代理列表配置代理选项，并返回一个代理对象
 * configure proxy options according to the proxy list and return a proxy object
 * @param proxyList
 */
export function configureProxy(proxyList: [string, string][] = []) {
  // 创建一个空的代理对象
  // Create an empty proxy object
  const proxyConfig: Record<string, ProxyOptions> = {};
  // 遍历代理列表中的每一对前缀和目标地址
  // Iterate over each pair of prefix and target address in the proxy list
  for (const [prefix, target] of proxyList) {
    // 判断目标地址是否是https协议
    // Determine if the target address is https protocol
    const isHttps = /^https:\/\//.test(target);
    // 根据前缀和目标地址设置代理选项，参考https://github.com/http-party/node-http-proxy#options
    // Set proxy options according to prefix and target address, refer to https://github.com/http-party/node-http-proxy#options
    proxyConfig[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      // 使用正则表达式替换路径中的前缀为空字符串，实现重写路径的功能
      // Use regular expression to replace the prefix in the path with an empty string, to achieve the function of rewriting the path
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ""),
      // 如果目标地址是https协议，需要设置secure为false，否则不需要设置该选项
      // If the target address is https protocol, need to set secure to false, otherwise do not need to set this option
      ...(isHttps ? { secure: false } : {}),
    };
  }
  // 返回代理对象
  // Return the proxy object
  return proxyConfig;
}
