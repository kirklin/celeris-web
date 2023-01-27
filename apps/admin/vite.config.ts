import { defineConfig } from "vite";
import { createViteConfig } from "./vite/createViteConfig";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  return createViteConfig(command, mode, process.cwd());
});
