import GenerateConfig from "unplugin-config/vite";
import type { PluginOption } from "vite";
import { APP_NAME, GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from "../constants";

export function createConfigPluginConfig(shouldGenerateConfig: boolean): PluginOption {
  // https://github.com/kirklin/unplugin-config
  return GenerateConfig({
    appName: APP_NAME,
    envVariables: {
      prefix: "VITE_GLOB_",
    },
    configFile: {
      generate: shouldGenerateConfig,
      fileName: GLOB_CONFIG_FILE_NAME,
      outputDir: OUTPUT_DIR,
    },
  });
}
