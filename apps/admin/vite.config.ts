import { defineConfig } from "vite";
import { createViteConfig } from "@celeris/vite";

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
  return await createViteConfig(command, mode, process.cwd());
});
