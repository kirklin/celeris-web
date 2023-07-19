import { colorToRgb, generateColorPalettes, setCssVariable } from "@celeris/utils";
import { effectScope, onScopeDispose, watch } from "vue";
import type { GlobalThemeOverrides } from "naive-ui";
import { kebabCase } from "lodash-es";
import { useDesignStore } from "~/store/modules/design";

/**
 * 订阅NaiveUI自定义主题的变化
 * Subscribe to changes in the NaiveUI custom theme
 */
export default function subscribeThemeStore() {
  const designStore = useDesignStore();
  const scope = effectScope();

  scope.run(() => {
    watch(
      () => designStore.getNaiveUICustomTheme,
      (newTheme) => {
        if (newTheme?.common) {
          addThemeCssVariablesToHtml(newTheme?.common);
        }
      },
      { immediate: true },
    );
  });
  /**
   * 组件销毁时清理effect scope
   * Clean up the effect scope when the component is destroyed
   */
  onScopeDispose(() => {
    scope.stop();
  });
}

type ThemeVars = Exclude<GlobalThemeOverrides["common"], undefined>;
type ThemeVarsKeys = keyof ThemeVars;

/**
 * 将主题颜色变量添加到HTML中
 * Add theme color variables to HTML
 * @param {ThemeVars} themeVars - 主题变量对象
 */
function addThemeCssVariablesToHtml(themeVars: ThemeVars) {
  for (const [key, color] of Object.entries(themeVars) as [ThemeVarsKeys, string][]) {
    if (color) {
      const { r, g, b } = colorToRgb(color);
      setCssVariable(`--${kebabCase(key)}`, `${r},${g},${b}`);
      if (key === "primaryColor") {
        const colorPalettes = generateColorPalettes(color);

        for (let index = 0; index < colorPalettes.length; index++) {
          const palette = colorPalettes[index];
          const { r: pR, g: pG, b: pB } = colorToRgb(palette);
          setCssVariable(`--${kebabCase(key)}${index + 1}`, `${pR},${pG},${pB}`);
        }
      }
    }
  }
}
