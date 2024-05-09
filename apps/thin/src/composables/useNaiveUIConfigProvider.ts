import { dateZhCN, zhCN } from "naive-ui";
import { useAppSetting, useThemeSetting } from "~/composables/setting";
import { designNamespace, designPrefixCls } from "~/setting/designSetting";

// Naive UI Config Provider
export function useNaiveUIConfigProvider() {
  const { getNaiveUIPresetTheme, getNaiveUICustomTheme } = useThemeSetting();
  const { getLocale } = useAppSetting();
  const configProviderProps = toRef({
    "cls-prefix": designPrefixCls,
    "theme": getNaiveUIPresetTheme,
    "theme-overrides": getNaiveUICustomTheme,
    "namespace": designNamespace,
    "locale": getLocale.value === "zh" ? zhCN : null,
    "date-locale": getLocale.value === "zh" ? dateZhCN : null,
    "inline-theme-disabled": true,
  });

  return {
    configProviderProps,
  };
}
