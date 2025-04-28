import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./index.ts",
  ],
  declaration: true,
  clean: true,
  failOnWarn: false,
  externals: ["vue", "vue-router"],
  rollup: {
    emitCJS: false,
  },
});
