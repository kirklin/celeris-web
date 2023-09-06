import process from "node:process";
import type { ViteEnvVariables } from "@celeris/types";
import type { ProxyOptions } from "vite";

/**
 * 读取所有环境变量配置文件，并将它们添加到process.env中
 * Read all environment variable configuration files and add them to process.env
 *
 * @param envConf 包含环境变量配置的对象 Object containing environment variable configuration
 * @returns 包含更新后的环境变量的对象 Object with the updated environment variables
 */
export function updateEnvVariables(envConf: Recordable<string>): Partial<ViteEnvVariables> {
  // 创建一个空的对象，用于存储Vite环境变量
  // Create an empty object to store Vite environment variables
  const viteEnv: Partial<ViteEnvVariables> = {};

  // 遍历envConf中的所有键值对
  // Iterate over all key-value pairs in envConf
  for (const [key, value] of Object.entries(envConf)) {
    // 将值转换为字符串，并替换换行符为\n
    // Convert the value to a string and replace line breaks with \n
    let realValue: string | number | boolean | Recordable = String(value).replace(/\\n/g, "\n");

    // 根据键名和值类型进行特殊处理
    // Perform special handling according to key name and value type
    switch (key) {
      case "VITE_PORT":
        realValue = Number(realValue) || 8888;
        break;
      case "VITE_PROXY":
        if (realValue) {
          try {
            // 将VITE_PROXY转换为JSON对象，并替换单引号为双引号，如果失败则设置为空对象
            // Convert VITE_PROXY to a JSON object and replace single quotes with double quotes, if it fails then set it to an empty object
            realValue = JSON.parse(realValue.replace(/'/g, "\""));
          } catch (error) {
            realValue = {};
          }
        }
        break;
      default:
        // 将字符串"true"和"false"转换为布尔值，其他情况不变
        // Convert string "true" and "false" to boolean values, otherwise keep unchanged
        realValue = realValue === "true" ? true : realValue === "false" ? false : realValue;
    }

    // 设置环境变量的值，如果是字符串类型则直接赋值，否则转换为JSON字符串赋值，并将其添加到viteEnv对象中
    // Set the value of the environment variable, if it is a string type then assign directly, otherwise convert to JSON string and assign, and add it to the viteEnv object
    if (realValue) {
      viteEnv[key] = realValue;
      process.env[key] = typeof realValue === "string" ? realValue : JSON.stringify(realValue);
    }
  }

  return viteEnv;
}

/**
 * 根据代理列表配置代理选项，并返回一个代理对象
 * configure proxy options according to the proxy list and return a proxy object
 * @param proxyList
 */
export function configureProxy(proxyList: [string, string][] = []) {
  // 创建一个空的代理对象
  // Create an empty proxy object
  const proxyConfig: Recordable<ProxyOptions> = {};
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
