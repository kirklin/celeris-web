<script setup lang="ts">
import type { LineSeriesOption } from "echarts";
import type { ToolTipFormatterParams } from "../../../../types/echarts";
import { queryDataOverview } from "~/apis/internal/dashboard";

function tooltipItemsHtmlString(items: ToolTipFormatterParams[]) {
  return items
    .map(
      el => `<div class="content-panel">
        <p>
          <span style="background-color: ${
        el.color
      }" class="tooltip-item-icon"></span><span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">${el.value.toLocaleString()}</span>
      </div>`,
    )
    .reverse()
    .join("");
}

function generateSeries(name: string, lineColor: string, itemBorderColor: string, data: number[]): LineSeriesOption {
  return {
    name,
    data,
    stack: "Total",
    type: "line",
    smooth: true,
    symbol: "circle",
    symbolSize: 10,
    itemStyle: {
      color: lineColor,
    },
    emphasis: {
      focus: "series",
      itemStyle: {
        color: lineColor,
        borderWidth: 2,
        borderColor: itemBorderColor,
      },
    },
    lineStyle: {
      width: 2,
      color: lineColor,
    },
    showSymbol: false,
    areaStyle: {
      opacity: 0.1,
      color: lineColor,
    },
  };
}
const { loading, setLoading } = useLoading(true);
const { getDarkMode } = useThemeSetting();
const renderData = computed(() => [
  {
    title: "用户数",
    value: 1902,
    prefix: {
      icon: "tabler:user-square-rounded",
      background: getDarkMode.value ? "#593E2F" : "#FFE4BA",
      iconColor: getDarkMode.value ? "#F29A43" : "#F77234",
    },
  },
  {
    title: "总对话数",
    value: 2445,
    prefix: {
      icon: "tabler:messages",
      background: getDarkMode.value ? "#3D5A62" : "#E8FFFB",
      iconColor: getDarkMode.value ? "#6ED1CE" : "#33D1C9",
    },
  },
  {
    title: "被复制对话数",
    value: 3034,
    prefix: {
      icon: "tabler:message",
      background: getDarkMode.value ? "#354276" : "#E8F3FF",
      iconColor: getDarkMode.value ? "#4A7FF7" : "#165DFF",
    },
  },
  {
    title: "点赞数",
    value: 1275,
    prefix: {
      icon: "tabler:thumb-up-filled",
      background: getDarkMode.value ? "#3F385E" : "#F5E8FF",
      iconColor: getDarkMode.value ? "#8558D3" : "#722ED1",
    },
  },
]);
const xAxis = ref<string[]>([]);
const userData = ref<number[]>([]);
const totalConversationData = ref<number[]>([]);
const copiedConversationData = ref<number[]>([]);
const likedResponsesData = ref<number[]>([]);
const { chartOption } = useChartOption((isDark: boolean) => {
  return {
    grid: {
      left: "2.6%",
      right: "4",
      top: "40",
      bottom: "40",
    },
    xAxis: {
      type: "category",
      offset: 2,
      data: xAxis.value,
      boundaryGap: false,
      axisLabel: {
        color: "#4E5969",
        formatter(value: number, idx: number) {
          if (idx === 0) {
            return "";
          }
          if (idx === xAxis.value.length - 1) {
            return "";
          }
          return `${value}`;
        },
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisPointer: {
        show: true,
        lineStyle: {
          color: "#23ADFF",
          width: 2,
        },
      },
    },
    yAxis: {
      type: "value",
      axisLine: {
        show: false,
      },
      axisLabel: {
        formatter(value: number, idx: number) {
          if (idx === 0) {
            return String(value);
          }
          return `${value / 1000}k`;
        },
      },
      splitLine: {
        lineStyle: {
          color: isDark ? "#2E2E30" : "#F2F3F5",
        },
      },
    },
    tooltip: {
      trigger: "axis",
      formatter(params) {
        const [firstElement] = params as ToolTipFormatterParams[];
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsHtmlString(params as ToolTipFormatterParams[])}
          </div>`;
      },
      className: "echarts-tooltip-custom",
    },
    graphic: {
      elements: [
        {
          type: "text",
          left: "2.6%",
          bottom: "18",
          style: {
            text: "12.10",
            textAlign: "center",
            fill: "#4E5969",
            fontSize: 12,
          },
        },
        {
          type: "text",
          right: "0",
          bottom: "18",
          style: {
            text: "12.17",
            textAlign: "center",
            fill: "#4E5969",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      generateSeries(
        "用户数",
        "#722ED1",
        "#F5E8FF",
        userData.value,
      ),
      generateSeries(
        "总对话数",
        "#F77234",
        "#FFE4BA",
        totalConversationData.value,
      ),
      generateSeries(
        "被复制对话数",
        "#33D1C9",
        "#E8FFFB",
        copiedConversationData.value,
      ),
      generateSeries(
        "点赞数",
        "#3469FF",
        "#E8F3FF",
        likedResponsesData.value,
      ),
    ],
  };
});
async function fetchData() {
  setLoading(true);
  try {
    const data = await queryDataOverview();
    xAxis.value = data.xAxis;
    data.data.forEach((el) => {
      if (el.name === "用户数") {
        userData.value = el.value;
      } else if (el.name === "总对话数") {
        totalConversationData.value = el.value;
      } else if (el.name === "被复制对话数") {
        copiedConversationData.value = el.value;
      }
      likedResponsesData.value = el.value;
    });
  } catch (err) {
    setLoading(false);
  } finally {
    setLoading(false);
  }
}
fetchData();
</script>

<template>
  <NSpin :show="loading" style="width: 100%">
    <NCard
      title="数据总览"
    >
      <NRow justify="space-between">
        <NCol v-for="(item, idx) in renderData" :key="idx" :span="6">
          <NStatistic
            :label="item.title"
            tabular-nums
          >
            <span class="inline-block w-8 h-8 text-center align-baseline flex-center rounded mr-2" :style="{ background: item.prefix.background }">
              <CAIcon :size="20" :icon="item.prefix.icon" :color="item.prefix.iconColor" />
            </span>
            <span>{{ item.value }}</span>
          </NStatistic>
        </NCol>
      </NRow>
      <CACharts style="height: 320px; margin-top: 10px" :option="chartOption" />
    </NCard>
  </NSpin>
</template>

<style scoped>
</style>
