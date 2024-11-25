import { withInstall } from "@celeris/utils";
import charts from "./src/Charts.vue";

export { default as CACharts } from "./src/Charts.vue";

export const Charts = withInstall(charts);

export * from "./types/echarts";
