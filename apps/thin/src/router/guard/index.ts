import { openWindow } from "@celeris/utils";
import type { RouteLocationNormalized, Router } from "vue-router";
import { AxiosCanceler } from "@celeris/request";
import { createPageLoadingGuard } from "~/router/guard/pageLoadingGuard";
import NProgress from "~/setting/nprogress";
import { useTransitionSetting } from "~/composables/setting/useTransitionSetting";
import { DEFAULT_PROJECT_SETTING } from "~/setting/projectSetting";
import { createPermissionGuard } from "~/router/guard/permissionGuard";
import { createStateGuard } from "~/router/guard/stateGuard";
import { notifyRouteChange } from "~/router/mitt/routeChange";

// Don't change the order of creation
// 不要改变创建的顺序
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createExternalLinkGuard(router);
  createHttpGuard(router);
  createProgressGuard(router);
  createPermissionGuard(router);
  createStateGuard(router);
}

/**
 * 创建一个页面守卫，用来标记已经加载过的页面并通知路由变化
 * creates a page guard that marks the loaded pages and notifies the route change
 * @param router - 路由对象。
 */
export function createPageGuard(router: Router): void {
  // Define a set to store the loaded pages
  // 定义一个集合，用来存储已经加载过的页面
  const loadedPages = new Set<string>();
  // Define a function that determines whether a page has been loaded
  // 定义一个函数，用来判断一个页面是否已经加载过
  function isPageAlreadyLoaded(to: RouteLocationNormalized): boolean {
    return loadedPages.has(to.path);
  }
  // Define a function that marks a page as loaded
  // 定义一个函数，用来把一个页面标记为已经加载过
  function markPageAsLoaded(to: RouteLocationNormalized): void {
    if (!isPageAlreadyLoaded(to)) {
      loadedPages.add(to.path);
    }
  }

  router.beforeEach((to: RouteLocationNormalized) => {
    to.meta.loaded = isPageAlreadyLoaded(to);
    notifyRouteChange(to);
    return true;
  });

  router.afterEach((to: RouteLocationNormalized) => {
    markPageAsLoaded(to);
  });
}

/**
 * 创建一个HTTP守卫，当路由切换时取消所有未完成的请求。
 * Creates an HTTP guard that cancels all pending requests when the route is switched.
 * @param router - 路由对象。
 */
export function createHttpGuard(router: Router) {
  // 定义一个闭包，用来缓存AxiosCanceler的实例
  // Define a closure to cache the AxiosCanceler instance
  let axiosCanceler: AxiosCanceler | null = null;
  // 定义一个函数，根据项目配置返回是否需要移除所有未完成的HTTP请求的标志，并创建或销毁AxiosCanceler实例
  // Define a function that returns whether all pending HTTP requests need to be removed according to the project configuration, and creates or destroys the AxiosCanceler instance
  function shouldCancelAllRequests() {
    const shouldCancelAllRequests = DEFAULT_PROJECT_SETTING.shouldRemoveAllHttpPending;
    if (shouldCancelAllRequests && !axiosCanceler) {
      // 如果需要移除，并且没有AxiosCanceler实例，则创建一个
      axiosCanceler = new AxiosCanceler();
    } else if (!shouldCancelAllRequests && axiosCanceler) {
      // 如果不需要移除，并且有AxiosCanceler实例，则销毁它
      axiosCanceler = null;
    }
    return shouldCancelAllRequests;
  }

  router.beforeEach(() => {
    // 如果需要移除，则调用AxiosCanceler实例的方法取消所有未完成的请求
    // If you need to remove, call the AxiosCanceler instance’s method to cancel all pending requests
    if (shouldCancelAllRequests() && axiosCanceler) {
      axiosCanceler.removeAllPending();
    }
    // 返回true表示允许路由切换
    return true;
  });
}

/**
 * 创建一个进度条守卫，当路由切换时显示或隐藏进度条
 * Creates a progress bar guard that shows or hides the progress bar when the route is switched
 * @param router - 路由对象。
 */
export function createProgressGuard(router: Router) {
  const { getShouldEnableTransition, getShouldOpenNProgress } = useTransitionSetting();
  router.beforeEach((to) => {
    // 如果目标路由已经加载过，则直接放行
    // If the target route has been loaded, pass directly
    if (to.meta.loaded) {
      return true;
    }
    if (toValue(getShouldEnableTransition) && toValue(getShouldOpenNProgress) && !NProgress.isStarted()) {
      NProgress.start();
    }
    return true;
  });

  router.afterEach(() => {
    if (toValue(getShouldEnableTransition) && toValue(getShouldOpenNProgress)) {
      NProgress.done();
    }
    return true;
  });
}

/**
 * 创建一个外部链接守卫，当路由切换时打开外部链接，而不是切换路由
 * Creates an external link guard that opens an external link when the route is switched
 * @param router - 路由对象。
 */
export function createExternalLinkGuard(router: Router) {
  router.beforeEach((to) => {
    const { meta } = to;
    if (meta && Reflect.has(meta, "externalLink")) {
      openWindow(<string>meta.externalLink);
      return false;
    }
    return true;
  });
}
