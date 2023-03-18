import type { GlobConfig, GlobEnvConfig } from "@celeris/types";
import { version } from "../package.json";

/**
 * Get the configuration file variable name
 * @param env
 */
export function getAppConfigFileName(env: GlobEnvConfig): string {
  const shortName: string = env.VITE_GLOB_APP_SHORT_NAME || "__APP";
  return `__PRODUCTION__${shortName}__CONF__`.toUpperCase().replace(/\s/g, "");
}

export function getAppGlobalConfig(env: GlobEnvConfig): GlobConfig {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_APP_SHORT_NAME }
    = getAppGlobalEnvConfig(env);

  if (!/^[a-zA-Z\_]*$/.test(VITE_GLOB_APP_SHORT_NAME)) {
    console.warn(
      "VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.",
    );
  }

  return {
    APP_TITLE: VITE_GLOB_APP_TITLE || "",
    API_URL: VITE_GLOB_API_URL || "",
    APP_SHORT_NAME: VITE_GLOB_APP_SHORT_NAME || "",
  };
}

function createStorageKeyPrefix(env: GlobEnvConfig): string {
  const AppConfig: GlobEnvConfig = getAppGlobalEnvConfig(env);
  const mode = AppConfig.MODE || "";
  return `${AppConfig.VITE_GLOB_APP_SHORT_NAME}_${mode}`.toUpperCase();
}

// Generate cache key according to version
export function createStorageName(env: GlobEnvConfig): string {
  return `${createStorageKeyPrefix(env)}_${version}_`.toUpperCase();
}

function getAppGlobalEnvConfig(env: GlobEnvConfig): GlobEnvConfig {
  const envName = getAppConfigFileName(env);
  const envValue = env.DEV ? env : window[envName];
  return envValue as GlobEnvConfig;
}
