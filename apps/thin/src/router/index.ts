import type { App } from "vue";
import type { RouteRecordName, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes } from "./routes";

// Create a whitelist of route names
const WHITE_NAME_LIST: RouteRecordName[] = [];
function generateRouteNames(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    WHITE_NAME_LIST.push(route.name ?? "");
    if (route.children) {
      generateRouteNames(route.children);
    }
  });
}

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  // When switching pages, scroll to the top
  // 当切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// Fill the whitelist with route names from basicRoutes
generateRouteNames(basicRoutes);

// Reset the router by removing routes not in the whitelist
export function resetRouter() {
  const allRoutes = router.getRoutes();
  allRoutes.forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name)) {
      if (router.hasRoute(name)) {
        router.removeRoute(name);
      }
    }
  });
}

export function setupRouter(app: App<Element>) {
  app.use(router);
}
