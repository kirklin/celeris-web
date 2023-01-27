import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes } from "./routes";
import NProgress from "~/config/nprogress";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  // When switching pages, scroll to the top
  // 当切换页面，滚动到最顶部
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// Injection Progress
router.beforeEach(() => {
  if (!NProgress.isStarted()) {
    NProgress.start();
  }
});

router.afterEach(() => {
  NProgress.done();
});
