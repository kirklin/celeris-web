import type { GlobalTheme, GlobalThemeOverrides, NDateLocale, NLocale } from "naive-ui";
import type { Ref } from "vue";
import { dateZhCN, zhCN } from "naive-ui";
import { useAppSetting, useThemeSetting } from "~/composables/setting";
import { designNamespace, designPrefixCls } from "~/setting/designSetting";

// Define an intermediate type that uses explicit Naive UI types
interface ConfigObject {
  "cls-prefix": string;
  "theme": Ref<GlobalTheme>;
  "theme-overrides": Ref<GlobalThemeOverrides | null>;
  "namespace": string;
  "locale": NLocale | null;
  "date-locale": NDateLocale | null;
  "inline-theme-disabled": boolean;
}

// Naive UI Config Provider
export function useNaiveUIConfigProvider(): { configProviderProps: Ref<any> } {
  const { getNaiveUIPresetTheme, getNaiveUICustomTheme } = useThemeSetting();
  const { getLocale } = useAppSetting();

  // Explicitly type the object
  const configObject: ConfigObject = {
    "cls-prefix": designPrefixCls,
    "theme": getNaiveUIPresetTheme,
    "theme-overrides": getNaiveUICustomTheme,
    "namespace": designNamespace,
    "locale": getLocale.value === "zh" ? zhCN : null,
    "date-locale": getLocale.value === "zh" ? dateZhCN : null,
    "inline-theme-disabled": true,
  };
  const configProviderProps = toRef(configObject);

  return {
    configProviderProps,
  };
}
