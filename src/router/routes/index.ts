import { PageConstant } from "~/constant/pageConstant";
import { PAGE_NOT_FOUND_ROUTE } from "~/router/routes/basic";
import layout from "~/router/routes/layout";

// 根路由
export const RootRoute = {
  path: "/",
  name: "Root",
  redirect: PageConstant.BASE_HOME,
  meta: {
    title: "Root",
  },
};

// Basic routing without permission
// 无需认证的基本路由
export const basicRoutes = [
  RootRoute,
  layout,
  PAGE_NOT_FOUND_ROUTE,
];
