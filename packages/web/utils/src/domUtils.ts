import { isServerRendering, isString } from "./typeChecks";
import { NOOP } from "./util";

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

/**
 * Attaches an event listener to an HTML element or the Window object.
 * 将事件监听器附加到 HTML 元素或 Window 对象上。
 *
 * If the code is running on the server-side rendering (SSR) environment, the function does nothing (NOOP).
 * 如果代码在服务器端渲染（SSR）环境中运行，则此函数不执行任何操作（NOOP）。
 *
 * @function
 * @param {HTMLElement | Window} element - The HTML element or Window object to attach the event listener to.
 *                                        要附加事件监听器的 HTML 元素或 Window 对象。
 * @param {K} event - The name of the event to listen for.
 *                   要监听的事件名称。
 * @param {(ev: HTMLElementEventMap[K]) => void} handler - The event handler function to execute when the event is triggered.
 *                                                        事件触发时要执行的事件处理函数。
 * @param {boolean | AddEventListenerOptions} [options=false] - Optional. An options object that specifies characteristics about the event listener.
 *                                                             可选项。一个包含事件监听器特性的选项对象。
 */
export const on = (() => {
  if (isServerRendering) {
    return NOOP;
  }
  return <K extends keyof HTMLElementEventMap>(
    element: HTMLElement | Window,
    event: K,
    handler: (ev: HTMLElementEventMap[K]) => void,
    options: boolean | AddEventListenerOptions = false,
  ) => {
    element.addEventListener(
      event,
      handler as EventListenerOrEventListenerObject,
      options,
    );
  };
})();

/**
 * Removes an event listener from an HTML element or the Window object.
 * 从 HTML 元素或 Window 对象中移除事件监听器。
 *
 * If the code is running on the server-side rendering (SSR) environment, the function does nothing (NOOP).
 * 如果代码在服务器端渲染（SSR）环境中运行，则此函数不执行任何操作（NOOP）。
 *
 * @function
 * @param {HTMLElement | Window} element - The HTML element or Window object to remove the event listener from.
 *                                        要移除事件监听器的 HTML 元素或 Window 对象。
 * @param {K} type - The name of the event to remove the listener from.
 *                  要移除监听器的事件名称。
 * @param {(ev: HTMLElementEventMap[K]) => void} handler - The event handler function to be removed.
 *                                                        要移除的事件处理函数。
 * @param {boolean | EventListenerOptions} [options=false] - Optional. An options object that specifies characteristics about the event listener.
 *                                                             可选项。一个包含事件监听器特性的选项对象。
 */
export const off = (() => {
  if (isServerRendering) {
    return NOOP;
  }
  return <K extends keyof HTMLElementEventMap>(
    element: HTMLElement | Window,
    type: K,
    handler: (ev: HTMLElementEventMap[K]) => void,
    options: boolean | EventListenerOptions = false,
  ) => {
    element.removeEventListener(
      type,
      handler as EventListenerOrEventListenerObject,
      options,
    );
  };
})();

/**
 * Queries the DOM for the first element that matches the specified selectors within the given container.
 * 在给定容器中查询与指定选择器匹配的第一个元素。
 *
 * If the code is running on the server-side rendering (SSR) environment, the function returns undefined.
 * 如果代码在服务器端渲染（SSR）环境中运行，则此函数返回 undefined。
 *
 * @function
 * @param {string} selectors - A DOMString containing one or more CSS selectors separated by commas.
 *                             一个包含一个或多个用逗号分隔的 CSS 选择器的 DOMString。
 * @param {Document | HTMLElement} [container] - Optional. The container within which to search for the element(s).
 *                                                        可选项。要搜索元素的容器。
 * @returns {HTMLElement | undefined} The first element that matches the selectors within the container, or undefined if not found.
 *                                    与选择器匹配的第一个元素（在容器内），如果找不到则返回 undefined。
 */
export function querySelector(selectors: string, container?: Document | HTMLElement): HTMLElement | undefined {
  if (isServerRendering) {
    return NOOP();
  }
  return (
    (container ?? document).querySelector<HTMLElement>(selectors) ?? undefined
  );
}

/**
 * Gets the DOM element based on the target string, element, or undefined input within the given container.
 * 根据给定容器中的目标字符串、元素或 undefined 输入来获取 DOM 元素。
 *
 * If the target is a string, it treats it as a CSS selector (e.g., "#myId" or ".myClass") and searches for the element within the container.
 * 如果目标是字符串，则将其视为 CSS 选择器（例如 "#myId" 或 ".myClass"）并在容器内搜索该元素。
 *
 * If the target is an HTMLElement, it returns the target element itself.
 * 如果目标是 HTMLElement，则返回目标元素本身。
 *
 * If the target is undefined, it returns undefined.
 * 如果目标是 undefined，则返回 undefined。
 *
 * If the code is running on the server-side rendering (SSR) environment, the function returns undefined.
 * 如果代码在服务器端渲染（SSR）环境中运行，则此函数返回 undefined。
 *
 * @function
 * @param {string | HTMLElement | undefined} target - The target to get the DOM element for.
 *                                                   要获取 DOM 元素的目标。
 * @param {Document | HTMLElement} [container] - Optional. The container within which to search for the element.
 *                                                        可选项。要搜索元素的容器。
 * @returns {HTMLElement | undefined} The DOM element based on the target input, or undefined if not found or if the input is undefined.
 *                                    根据目标输入获取的 DOM 元素，如果未找到或输入为 undefined，则返回 undefined。
 */
export function getElement(target: string | HTMLElement | undefined, container?: Document | HTMLElement): HTMLElement | undefined {
  if (isString(target)) {
    const selector = target[0] === "#" ? `[id='${target.slice(1)}']` : target;
    return querySelector(selector, container);
  }
  return target;
}
