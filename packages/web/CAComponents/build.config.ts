import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  // Specify external dependencies to avoid bundling them
  externals: [
    "vue",
    "@vue/runtime-core",
    "@vue/runtime-dom",
    "@vue/reactivity",
    "@vue/shared",
    "naive-ui", // Also externalize peer dependencies
  ],
  // Ensure declaration files are generated
  declaration: true,
});
