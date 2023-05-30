// Declares a constant variable to store the name of a page not found, with the value "PageNotFound"
// 声明页面未找到的名称常量，值为字符串"PageNotFound"
export const PAGE_NOT_FOUND_NAME = "PageNotFound";

// Declares a constant variable to store the name of a redirect, with the value "Redirect"
// 声明重定向的名称常量，值为字符串"Redirect"
export const REDIRECT_NAME = "Redirect";

// Declares a constant variable to store the name of a parent layout, with the value "ParentLayout"
// 声明父级布局的名称常量，值为字符串"ParentLayout"
export const PARENT_LAYOUT_NAME = "ParentLayout";

/**
 * @description: Exception component 异常组件
 * @constructor
 */
export const EXCEPTION_COMPONENT = () => import("~/pages/internal/exception/Exception.vue");

/**
 * @description: Default page layout component 默认页面布局组件
 */
export const LAYOUT = () => import("~/layouts/index.vue");

/**
 * @description: IFrame container component for embedding iframes 内嵌 iframe 容器组件
 */
export const IFRAME = () => import("~/pages/internal/iframe/IframeContainer.vue");

/**
 * @description: Get the parent layout component based on the _name parameter 获取基于 _name 参数的父级布局组件
 * @param _name Optional, the name of the parent layout component, default is PARENT_LAYOUT_NAME 可选参数，父级布局组件的名称，默认为 PARENT_LAYOUT_NAME
 * @return A function that returns a Promise with an object that contains the name property 返回一个函数，该函数返回一个 Promise，其中包含 name 属性的对象
 */
export function getParentLayout(_name = PARENT_LAYOUT_NAME) {
  // Return a function that returns a Promise that resolves with an object containing the layout name
  // 返回一个返回 Promise 的函数，该 Promise 解析为包含布局名称的对象
  return () => Promise.resolve({ name: _name });
}
