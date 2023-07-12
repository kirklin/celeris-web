import { useThemeSetting } from "~/composables/setting";
import { designNamespace, designPrefixCls } from "~/setting/designSetting";

// Naive UI Config Provider
export function useNaiveUIConfigProvider() {
  const { getNaivePresetTheme } = useThemeSetting();

  const configProviderProps = toRef({
    "cls-prefix": designPrefixCls,
    "theme": getNaivePresetTheme,
    "namespace": designNamespace,
  });

  return {
    configProviderProps,
  };
}
