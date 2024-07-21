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
});
