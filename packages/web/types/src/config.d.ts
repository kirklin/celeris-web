export interface MenuSetting {
  collapsed: boolean;
}

export interface ProjectConfig {
  // menuSetting
  menuSetting: MenuSetting;
}

export interface GlobConfig {
  // Site title
  APP_TITLE: string;
  // Service interface url
  API_URL: string;
  // Project abbreviation
  APP_SHORT_NAME: string;
}

export interface GlobEnvConfig extends ImportMetaEnv {
  VITE_USER_NODE_ENV: string;
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
}

// App Environment Variables
// 应用程序环境变量
export interface ViteEnvVariables extends GlobEnvConfig {

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
