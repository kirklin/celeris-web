import { PageConstants } from "@celeris/constants";
import type { RouteRecordRaw } from "vue-router";
import { PAGE_NOT_FOUND_ROUTE } from "~/router/routes/basic";
import layout from "~/router/routes/layout";

// 根路由
export const RootRoute: RouteRecordRaw = {
  path: "/",
  name: "Root",
  redirect: PageConstants.BASE_LOGIN,
  meta: {
    title: "Root",
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: PageConstants.BASE_LOGIN,
  name: "Login",
  component: () => import("~/views/login/index.vue"),
  meta: {
    title: "Login",
  },
};

// Basic routing without permission
// 无需认证的基本路由
export const basicRoutes: RouteRecordRaw[] = [
  RootRoute,
  LoginRoute,
  layout,
  PAGE_NOT_FOUND_ROUTE,
];
