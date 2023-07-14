import { useThemeSetting } from "~/composables/setting";
import { designNamespace, designPrefixCls } from "~/setting/designSetting";

// Naive UI Config Provider
export function useNaiveUIConfigProvider() {
  const { getNaiveUIPresetTheme, getNaiveUICustomTheme } = useThemeSetting();

  const configProviderProps = toRef({
    "cls-prefix": designPrefixCls,
    "theme": getNaiveUIPresetTheme,
    "theme-overrides": getNaiveUICustomTheme,
    "namespace": designNamespace,
  });

  return {
    configProviderProps,
  };
}
