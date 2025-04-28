import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "./index.ts", // Explicitly define the entry point
  ],
  // Specify external dependencies
  externals: [
    "vue",
    "vue-i18n",
    "iso-639-1",
    "@celeris/constants",
    "@celeris/hooks",
    "@celeris/utils",
  ],
  // Ensure declaration files are generated
  declaration: true,
  // Ignore warnings to prevent build failure on specific checks
  failOnWarn: false,
});
