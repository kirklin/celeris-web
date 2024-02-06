import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  timing: true,
  esbuild: {
    options: {
      target: "esnext",
    },
  },
  runtimeConfig: {
    proxyApiUrl: "http://localhost:9000",
  },
});
