// Declares a constant variable to store the name of a page not found, with the value "PageNotFound"
// 声明页面未找到的名称常量，值为字符串"PageNotFound"
export const PAGE_NOT_FOUND_NAME = "PageNotFound";

export const REDIRECT_NAME = "Redirect";

export const PARENT_LAYOUT_NAME = "ParentLayout";

/**
 * @description: Default page layout component 默认页面布局组件
 */
// The constant LAYOUT is a function that returns a Vue component imported from a specified path
export const LAYOUT = () => import("~/layouts/index.vue");

/**
 * @description: IFrame container component for embedding iframes 内嵌 iframe 容器组件
 */
// The constant IFrame is a function that returns a Vue component imported from a specified path
export const IFRAME = () => import("~/views/internal/iframe/IframeContainer.vue");

export const getParentLayout = (_name?: string) => {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: _name || PARENT_LAYOUT_NAME,
      });
    });
};
