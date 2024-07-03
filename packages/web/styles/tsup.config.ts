import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  clean: true,
  format: ["esm", "cjs", "iife"],
  external: ["vite"],
  dts: true,
  minify: true,
});
