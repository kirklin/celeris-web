<script setup lang="ts">
import { useThemeVars } from "@celeris/ca-components";
import { isNil } from "@celeris/utils";
import type { ToolTipFormatterParams } from "../../../../types/echarts";
import { DataInsightCard } from "~/component/Card";
import CardInnerIcon from "~/pages/dashboard/components/CardInnerIcon.vue";
import { queryUserAnalysisData } from "~/apis/internal/dashboard";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  quota: {
    type: String,
    default: "",
  },
  chartType: {
    type: String,
    default: "",
  },
  icon: {
    type: String,
    default: "",
  },
});

const { loading, setLoading } = useLoading(true);
const count = ref();
const growth = ref(100);
const chartData = ref<any>([]);
const themeVariables = useThemeVars();
const { chartOption } = useChartOption(() => {
  return {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    xAxis: {
      type: "category",
      show: false,
    },
    yAxis: {
      show: false,
    },
    tooltip: {
      show: true,
      trigger: "axis",
      formatter(params) {
        const [firstElement] = params as ToolTipFormatterParams[];
        const getData = () => {
          return firstElement.componentSubType === "line" ? firstElement.data : (firstElement.data as any)?.value;
        };
        if (!isNil(firstElement)) {
          count.value = getData();
        }
        return `<div>
            <p class="tooltip-title">${getData()}</p>
          </div>`;
      },
    },
    series: [
      {
        data: chartData.value,
        ...(props.chartType === "bar"
          ? {
              type: "bar",
              barWidth: 7,
              barGap: "0",
            }
          : {
              type: "line",
              showSymbol: false,
              smooth: true,
              lineStyle: {
                color: themeVariables.value.primaryColor,
              },
            }),
      },
    ],
  };
});
async function fetchData(params: { quota: string }) {
  try {
    const data = await queryUserAnalysisData(params);
    const { chartData: resChartData } = data;
    count.value = data.count;
    growth.value = data.growth;
    resChartData.data.value.forEach((el: number, idx: number) => {
      if (props.chartType === "bar") {
        chartData.value.push({
          value: el,
          itemStyle: {
            color: idx % 2 ? themeVariables.value.primaryColor : themeVariables.value.warningColor,
          },
        });
      } else {
        chartData.value.push(el);
      }
    });
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
}
fetchData({ quota: props.quota });
</script>

<template>
  <NSpin :show="loading" class="w-full">
    <DataInsightCard :title="title" :data-count="count" :chart-height="150">
      <template #icon>
        <CardInnerIcon :icon-name="icon" container />
      </template>
      <template #chart>
        <CACharts :options="chartOption" />
      </template>
    </DataInsightCard>
  </NSpin>
</template>

<style scoped>

</style>
