import {
  convertColorToRgbString,
  convertColorToRgbValues,
  generateColorPalettes,
  isColor,
  setCssVariable,
} from "@celeris/utils";
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
          addThemeColorCssVariablesToHtml(newTheme?.common);
          addThemeRgbColorCssVariablesToHtml(newTheme?.common);
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
function addThemeColorCssVariablesToHtml(themeVars: ThemeVars) {
  for (const [key, vars] of Object.entries(themeVars) as [ThemeVarsKeys, string][]) {
    if (vars) {
      if (isColor(vars)) {
        setCssVariable(`--${kebabCase(key)}`, convertColorToRgbString(vars));
        if (key === "primaryColor") {
          const colorPalettes = generateColorPalettes(vars);

          for (let index = 0; index < colorPalettes.length; index++) {
            const palette = colorPalettes[index];
            setCssVariable(`--${kebabCase(key)}-${index + 1}`, convertColorToRgbString(palette));
          }
        }
      } else {
        setCssVariable(`--${kebabCase(key)}`, vars);
      }
    }
  }
}

/**
 * 向 HTML 添加主题颜色变量的 RGB CSS 变量
 * Add theme color variables as RGB CSS variables to HTML
 * @param {ThemeVars} themeVars - 主题变量对象
 */
function addThemeRgbColorCssVariablesToHtml(themeVars: ThemeVars) {
  for (const [key, vars] of Object.entries(themeVars) as [ThemeVarsKeys, string][]) {
    if (vars) {
      if (isColor(vars)) {
        setCssVariable(`--${kebabCase(key)}-rgb`, convertColorToRgbValues(vars));
        if (key === "primaryColor") {
          const colorPalettes = generateColorPalettes(vars);

          for (let index = 0; index < colorPalettes.length; index++) {
            const palette = colorPalettes[index];
            setCssVariable(`--${kebabCase(key)}-${index + 1}-rgb`, convertColorToRgbValues(palette));
          }
        }
      } else {
        setCssVariable(`--${kebabCase(key)}`, vars);
      }
    }
  }
}
