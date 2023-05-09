import type { ComputedRef } from "vue";
import { computed } from "vue";
import type { EChartsOption } from "echarts";
import { useAppStore } from "~/store/modules/app";

// 为代码提示而导入的类型
// import { SeriesOption } from 'echarts';

// 定义函数类型
interface OptionsFn {
  (isDark: boolean): EChartsOption;
}

// 定义返回值类型
interface UseChartOptionReturn {
  chartOption: ComputedRef<EChartsOption>;
}

// 根据源选项生成图表选项
export function useChartOption(sourceOption: OptionsFn): UseChartOptionReturn {
  const appStore = useAppStore();

  // 计算当前是否使用暗色主题
  const isDark = computed<boolean>(() => {
    return appStore.getProjectConfig.themeColor === "dark";
  });

  // 生成图表选项
  const generateChartOption = (isDark: boolean): EChartsOption => {
    // TODO: echarts themes
    // echarts 可以使用主题构建器，但这里未使用
    return sourceOption(isDark);
  };

  // 返回计算属性
  return {
    chartOption: computed<EChartsOption>(() => generateChartOption(isDark.value)),
  };
}
