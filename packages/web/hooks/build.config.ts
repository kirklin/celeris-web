import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./index.ts",
  ],
  declaration: true,
  clean: true,
  externals: [
    "vue",
    "@vue/runtime-core",
    "@vue/runtime-dom",
    "@vue/reactivity",
    "@vue/shared",
    "@vueuse/core",
    "@celeris/utils",
  ],
});
