import { resolve } from "path";
import type { UserConfig } from "vite";
import { loadEnv } from "vite";
import { configVitePlugins } from "./plugins";
import { wrapperEnv } from "./utils";

export function createViteConfig(
  command: "build" | "serve",
  mode: string,
  cwd: string,
): UserConfig {
  const root = cwd;
  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);
  const {
    VITE_PUBLIC_PATH,
    VITE_DROP_CONSOLE,
  } = viteEnv;

  return {
    root,
    base: VITE_PUBLIC_PATH,

    resolve: {
      alias: {
        "~/": `${resolve(root, "src")}/`,
      },
    },
    server: {
      host: "localhost",
      port: 8888,
      open: true,
      https: false,
      proxy: {},
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ["console.log", "debugger"] : [],
    },
    build: {
      outDir: `${resolve(root, "dist")}`,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue", "pinia", "vue-router"],
          },
        },
      },
    },
    css: {
      preprocessorOptions: {
      },
    },
    plugins: configVitePlugins(root, viteEnv, command === "build"),
  };
}
