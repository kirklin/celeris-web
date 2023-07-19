/**
 * Toggle the given CSS class name on the specified element.
 * 在指定元素上切换给定的 CSS 类名。
 *
 * @param enableClass - A boolean value indicating whether to add or remove the CSS class name. 一个布尔值，表示是添加还是移除 CSS 类名
 * @param className - The name of the CSS class to add or remove. 要添加或移除的 CSS 类的名称。
 * @param element - The HTML element to which the class should be added or removed. 应添加或移除类的 HTML 元素。
 */
export function toggleCssClass(enableClass: boolean, className: string, element: HTMLElement = document.body) {
  const classNames = element.className.split(" ").filter(cn => cn !== className); // Split classNames by space, remove className.
  const newClassNames = enableClass ? [...classNames, className] : classNames; // Add className if enableClass is true.
  element.className = newClassNames.join(" ").trim(); // Join newClassNames with space and set to element.className.
}

/**
 * Set a CSS variable on the specified element.
 * 在指定的元素上设置 CSS 变量。
 *
 * @param property - The name of the CSS variable to set. 要设置的 CSS 变量的名称。
 * @param value - The value to set the CSS variable to. 要设置 CSS 变量的值
 * @param element - The HTML element on which to set the CSS variable. 要设置 CSS 变量的 HTML 元素。
 */
export function setCssVariable(property: string, value: string | null, element: HTMLElement = document.documentElement) {
  element.style.setProperty(property, value); // Set the specified property with the specified value.
}

/**
 * Set CSS variables on the specified element.
 * 在指定的元素上设置 CSS 变量。
 *
 * @param variables - An object containing the CSS variables to set and their values. 包含要设置的 CSS 变量及其值的对象。
 * @param element - The HTML element on which to set the CSS variables. 要设置 CSS 变量的 HTML 元素。
 */
export function setCssVariables(variables: Record<string, string | null>, element: HTMLElement = document.documentElement) {
  for (const [property, value] of Object.entries(variables)) {
    element.style.setProperty(property, value);
  }
}

/**
 * Parses a CSS string and returns an object with key-value pairs of CSS properties and their values.
 * 解析 CSS 字符串并返回一个包含 CSS 属性及其值的键值对对象。
 *
 * @param cssStr The CSS string to parse.
 * @returns An object with key-value pairs of CSS properties and their values.
 */
export function parseCSS(cssStr: string): Record<string, string> {
  const cssObj: Record<string, string> = {};
  const rules = cssStr.split(";");
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i].trim();
    if (!rule) {
      continue;
    }
    const [prop, val] = rule.split(":");
    if (!prop || !val) {
      continue;
    }
    cssObj[prop.trim()] = val.trim();
  }
  return cssObj;
}

/**
 * Serializes an object with key-value pairs of CSS properties and their values into a CSS string.
 * 将一个包含 CSS 属性及其值的键值对对象序列化为 CSS 字符串。
 *
 * @param cssObj An object with key-value pairs of CSS properties and their values.
 * @returns A CSS string representing the object's CSS properties and values.
 */
export function serializeCSS(cssObj: Record<string, string>): string {
  const cssArr: string[] = [];
  for (const prop in cssObj) {
    if (Object.prototype.hasOwnProperty.call(cssObj, prop)) {
      cssArr.push(`${prop}: ${cssObj[prop]};`);
    }
  }
  return cssArr.join(" ");
}
