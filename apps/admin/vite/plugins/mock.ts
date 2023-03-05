/**
 * Mock plugin for development and production.
 * @see https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from "vite-plugin-mock";

/**
 * Creates a mock plugin configuration for Vite.
 * @param isProduction Whether the application is in production mode.
 * @returns The mock plugin configuration.
 */
export function createMockPluginConfig(isProduction: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: "mock",
    localEnabled: !isProduction,
    prodEnabled: isProduction,
  });
}
