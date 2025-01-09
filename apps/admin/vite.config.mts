import { createViteConfig } from "@celeris/vite";

export default createViteConfig({
  overrides: {
    assetsInclude: ["**/*.svg"],
    build: {
      assetsInlineLimit: 0,
    },
  },
});
