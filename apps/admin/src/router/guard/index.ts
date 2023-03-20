import type { RouteLocationNormalized, Router } from "vue-router";
import { AxiosCanceler } from "@celeris/request";
import ProjectConfig from "~/config/projectConfig";
import { notifyRouteChange } from "~/router/mitt/routeChange";

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createHttpGuard(router);
}

function createPageGuard(router: Router): void {
  const loadedPages = new Set<string>();
  function isPageAlreadyLoaded(to: RouteLocationNormalized): boolean {
    return loadedPages.has(to.path);
  }
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
 * @param router - 路由对象。
 */
function createHttpGuard(router: Router) {
  // 定义一个闭包，用来缓存AxiosCanceler的实例
  let axiosCanceler: AxiosCanceler | null = null;
  // 定义一个函数，根据项目配置返回是否需要移除所有未完成的HTTP请求的标志，并创建或销毁AxiosCanceler实例
  function shouldCancelAllRequests() {
    const shouldCancelAllRequests = ProjectConfig.shouldRemoveAllHttpPending;
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
    if (shouldCancelAllRequests() && axiosCanceler) {
      axiosCanceler.removeAllPending();
    }
    // 返回true表示允许路由切换
    return true;
  });
}
