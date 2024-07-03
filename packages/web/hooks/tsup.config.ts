import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./index.ts"],
  clean: true,
  format: ["esm", "cjs", "iife"],
  external: ["vue"],
  dts: true,
  minify: true,
});
