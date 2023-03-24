import { resolve } from "node:path";
import type { GlobEnvConfig } from "@celeris/types";
import { getAppConfigFileName } from "@celeris/utils/src/config";
import { logger } from "@celeris/utils";
/**
 * Generate additional configuration files when used for packaging. The file can be configured with some global variables, so that it can be changed directly externally without repackaging
 */
import { mkdirp, readFileSync, writeFileSync } from "fs-extra";
import { cyan, gray, green, red } from "picocolors";
import dotenv from "dotenv";
import type { PluginOption } from "vite";
import { APP_NAME, GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from "../constants";
const PLUGIN_NAME = "vite-plugin-generate-config";

interface BuildConfigOptions {
  configName: string;
  config: any;
  configFileName?: string;
}

interface ConfigPluginOptions {
  disabledConfig?: boolean;
}

export function runBuildConfig() {
  const config = getEnvConfig();
  logger.info(`[${PLUGIN_NAME}]runBuildConfig: ${JSON.stringify(config)}`);
  const configFileName = getAppConfigFileName(config);
  logger.info(`[${PLUGIN_NAME}]configFileName: ${configFileName}`);
  createConfig({
    config,
    configName: configFileName,
    configFileName: GLOB_CONFIG_FILE_NAME,
  });
}

function createConfig({ configName, config, configFileName }: BuildConfigOptions) {
  try {
    const windowConf = `window.${configName}`;
    const configStr = `${windowConf}=${JSON.stringify(config)};
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });`.replace(/\s/g, "");

    const outputPath = resolve(process.cwd(), OUTPUT_DIR);
    void mkdirp(outputPath).then();

    writeFileSync(
      resolve(outputPath, configFileName || GLOB_CONFIG_FILE_NAME),
      configStr,
    );

    logger.info(
      `${cyan(`✨ [${APP_NAME}]`)} - configuration file is built successfully:`,
    );
    logger.info(`${gray(`${OUTPUT_DIR}/${green(configFileName || GLOB_CONFIG_FILE_NAME)}`)}\n`);
  } catch (error) {
    if (error instanceof Error) {
      logger.info(
        red(`[${PLUGIN_NAME}]configuration file failed to package:\n${error.message}`),
      );
    } else {
      logger.info(
        red(`[${PLUGIN_NAME}]configuration file failed to package:\n${String(error)}`),
      );
    }
  }
}

/**
 * Get the names of the configuration files that are in effect in the current environment
 */
function getEnvConfigFiles(): string[] {
  const script = process.env.npm_lifecycle_script || "";
  const reg = /--mode ([a-z_\d]+)/;
  const mode = reg.exec(script)?.[1] || "production";
  return [`.env.${mode}`, ".env"];
}

/**
 * Get the environment variables starting with the specified prefix
 * @param prefix prefix
 * @param files ext
 */
function getEnvConfig(prefix = "VITE_GLOB_", files = getEnvConfigFiles()): GlobEnvConfig {
  let envConfig = {};

  files.forEach((file) => {
    try {
      const env = dotenv.parse(readFileSync(resolve(process.cwd(), file)));
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`[${PLUGIN_NAME}]Error in parsing ${file}`, e);
    }
  });

  const reg = new RegExp(`^(${prefix})`);

  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });

  return <GlobEnvConfig>envConfig;
}

export function createGenerateConfigPlugin(options?: ConfigPluginOptions): PluginOption {
  return {
    name: PLUGIN_NAME,
    closeBundle() {
      try {
        // Generate configuration file
        if (!options?.disabledConfig) {
          runBuildConfig();
        }

        logger.info(`${cyan(`✨ [${APP_NAME}]`)} - build successfully!`);
      } catch (error) {
        if (error instanceof Error) {
          logger.error(
            red(`[${PLUGIN_NAME}]vite build error:\n${error.message}`),
          );
        } else {
          logger.error(
            red(`[${PLUGIN_NAME}]vite build error:\n${String(error)}`),
          );
        }
        process.exit(1);
      }
    },
  };
}
