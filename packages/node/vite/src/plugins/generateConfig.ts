import GenerateConfig from "unplugin-config/vite";
import type { PluginOption } from "vite";
import { APP_NAME, GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from "../constants";

export function createConfigPluginConfig(shouldGenerateConfig: boolean): PluginOption {
  // https://github.com/kirklin/unplugin-config
  return GenerateConfig({
    disabledConfig: !shouldGenerateConfig,
    globConfigFileName: GLOB_CONFIG_FILE_NAME,
    outputDir: OUTPUT_DIR,
    appName: APP_NAME,
    envConfigPrefix: "VITE_GLOB_",
  });
}
