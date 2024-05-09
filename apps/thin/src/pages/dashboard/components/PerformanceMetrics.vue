<script setup lang="ts">
import { useThemeVars } from "@celeris/ca-components";

const themeVariables = useThemeVars();
const { chartOption } = useChartOption((isDark: boolean) => {
  return {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 20,
    },
    legend: {
      show: true,
      top: "center",
      right: "0",
      orient: "vertical",
      icon: "circle",
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: isDark ? "#ffffff" : "#4E5969",
      },
    },
    radar: {
      center: ["35%", "50%"],
      radius: 80,
      indicator: [
        { name: "API调用次数" },
        { name: "响应时间" },
        { name: "错误率" },
        { name: "服务器负载" },
        { name: "用户满意度" },
        { name: "消息处理速度" },
      ],
      axisName: {
        color: isDark ? "#ffffff" : "#1D2129",
      },
      axisLine: {
        lineStyle: {
          color: isDark ? "#484849" : "#E5E6EB",
        },
      },
      splitLine: {
        lineStyle: {
          color: isDark ? "#484849" : "#E5E6EB",
        },
      },
      splitArea: {
        areaStyle: {
          color: [],
        },
      },
    },
    series: [
      {
        type: "radar",
        areaStyle: {
          opacity: 0.2,
        },
        data: [
          {
            value: [4850, 19000, 19000, 29500, 35200, 20000],
            name: "gpt-3.5-turbo",
            symbol: "none",
            itemStyle: {
              color: themeVariables.value.primaryColor,
            },
          },
          {
            value: [2250, 17000, 21000, 23500, 42950, 22000],
            name: "gpt-4",
            symbol: "none",
            itemStyle: {
              color: isDark ? "#A079DC" : "#313CA9",
            },
          },
          {
            value: [5850, 11000, 26000, 27500, 46950, 18000],
            name: "gpt-4-vision",
            symbol: "none",
            itemStyle: {
              color: isDark ? "#3D72F6" : "#21CCFF",
            },
          },
        ],
      },
    ],
  };
});
</script>

<template>
  <!--  清晰地传达该模块关注的是Chatbot的技术性能方面的指标。 -->
  <NCard
    title="技术指标综述"
  >
    <CACharts style="height: 222px" :option="chartOption" />
  </NCard>
</template>

<style scoped>

</style>
