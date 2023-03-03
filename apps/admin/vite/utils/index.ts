export interface viteEnvVariables {
  VITE_PUBLIC_PATH: string;
  VITE_GLOB_APP_TITLE: string;
  VITE_DROP_CONSOLE: boolean;
}

/**
 * Read all environment variable configuration files and add them to process.env
 *
 * @param envConf Object containing environment variable configuration
 * @returns Object with the updated environment variables
 */
export function updateEnvVariables(envConf: Record<string, any>): viteEnvVariables {
  const viteEnv: Partial<viteEnvVariables> = {};

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
  return viteEnv as viteEnvVariables;
}
