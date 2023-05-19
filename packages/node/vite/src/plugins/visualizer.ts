/**
 * Visualize and analyze your Rollup bundle to see which modules are taking up space.
 * https://github.com/btd/rollup-plugin-visualizer
 */
import visualizer from "rollup-plugin-visualizer";
import type { PluginOption } from "vite";

export function createVisualizerPluginConfig(): PluginOption {
  return visualizer({
    filename: "./node_modules/.cache/visualizer/stats.html",
    open: true,
    gzipSize: true,
    brotliSize: true,
  }) as PluginOption;
}
