import { PageConstant } from "~/constant/pageConstant";
import { PAGE_NOT_FOUND_ROUTE } from "~/router/routes/basic";
import layout from "~/router/routes/layout";

// 根路由
export const RootRoute = {
  path: "/",
  name: "Root",
  redirect: PageConstant.BASE_LOGIN,
  meta: {
    title: "Root",
  },
};

export const LoginRoute = {
  path: PageConstant.BASE_LOGIN,
  name: "Login",
  component: () => import("~/views/login/index.vue"),
  meta: {
    title: "Login",
  },
};

// Basic routing without permission
// 无需认证的基本路由
export const basicRoutes = [
  RootRoute,
  LoginRoute,
  layout,
  PAGE_NOT_FOUND_ROUTE,
];
