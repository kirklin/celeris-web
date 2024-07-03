import process from "node:process";
import type { UserConfig } from "vite";
import { defineConfig, mergeConfig } from "vite";
import { createApplicationViteConfig } from "./configs/application";

interface ApplicationViteConfigOptions {
  overrides?: UserConfig;
  // options?: {};
}

export async function createViteConfig(applicationViteConfigOptions: ApplicationViteConfigOptions = {}) {
  const { overrides = {} } = applicationViteConfigOptions;
  const root = process.cwd();
  return defineConfig(async ({ command, mode }) => {
    return mergeConfigs([overrides, await createApplicationViteConfig(command, mode, root)]);
  });
}

export function mergeConfigs(configs: UserConfig[]): Record<string, any> {
  return configs.reduce((mergedConfig, config) => {
    return mergeConfig(mergedConfig, config);
  }, {});
}
