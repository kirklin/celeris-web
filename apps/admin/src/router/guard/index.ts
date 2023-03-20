import type { RouteLocationNormalized, Router } from "vue-router";
import { notifyRouteChange } from "~/router/mitt/routeChange";

// Don't change the order of creation
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
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
