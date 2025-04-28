import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./index.ts",
  ],
  declaration: true,
  clean: true,
  externals: ["vue", "@celeris/utils"],
});
