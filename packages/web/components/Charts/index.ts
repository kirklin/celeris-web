import { withInstall } from "@celeris/utils/src/vue/install";
import charts from "./src/Charts.vue";

export * from "./types/echarts";

export const Charts = withInstall(charts);

export { default as CACharts } from "./src/Charts.vue";
