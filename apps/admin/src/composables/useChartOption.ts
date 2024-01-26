import type { ComputedRef } from "vue";
import { computed } from "vue";
import type { EChartsOption } from "echarts";

// Define function type
interface ChartOptionsGenerator {
  (isDark: boolean): EChartsOption;
}

// Define return type
interface UseChartOptionReturn {
  chartOption: ComputedRef<EChartsOption>;
}

// 根据源选项生成图表选项
// Generate chart options based on source options
export function useChartOption(generateSourceOptions: ChartOptionsGenerator): UseChartOptionReturn {
  const { getDarkMode: isDark } = useThemeSetting();
  // 生成图表选项
  // Generate chart options
  const generateChartOptions = (): EChartsOption => {
    // TODO: echarts themes
    // ECharts可以使用主题构建器，但这里未使用
    // ECharts can use theme builders, but it is not used here
    return generateSourceOptions(isDark.value);
  };

  // 返回计算属性
  // Return computed property
  return {
    chartOption: computed<EChartsOption>(() => generateChartOptions()),
  };
}
