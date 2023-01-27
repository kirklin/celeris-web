export interface ViteEnv {
  VITE_PUBLIC_PATH: string;
  VITE_GLOB_APP_TITLE: string;
  VITE_DROP_CONSOLE: boolean;
}

// Read all environment variable configuration files to process.env
export function wrapperEnv(envConf: Record<string, any>): ViteEnv {
  const viteEnv: Partial<ViteEnv> = {};

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
  return viteEnv as ViteEnv;
}
