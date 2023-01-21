import { PageConstant } from "~/constant/pageConstant";
import { PAGE_NOT_FOUND_ROUTE } from "~/router/routes/basic";

const modules = import.meta.glob<{ default: any }>("./modules/**/*.ts", { eager: true });
const routeModuleList: any = [];

// 加入到路由集合中
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routeModuleList.push(...modList);
});

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
  ...routeModuleList,
  PAGE_NOT_FOUND_ROUTE,
];
