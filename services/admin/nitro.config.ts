import { defineNitroConfig } from "nitropack/config";

export default defineNitroConfig({
  timing: true,

  routeRules: {
    "/**": {
      cors: true,
    },
  },

  esbuild: {
    options: {
      target: "esnext",
    },
  },

  compatibilityDate: "2024-11-25",
});
