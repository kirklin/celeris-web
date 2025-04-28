import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index.ts",
  ],
  declaration: true,
  clean: true,
  externals: [
    "vue",
    "@celeris/constants",
    "vue-router",
    "@vue/devtools-api",
    "@vue/shared",
    "@celeris/types",
  ],
});
