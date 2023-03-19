import { PageConstants } from "@celeris/constants";
import { loadRoutesFromModules } from "@celeris/utils";
import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const modules = import.meta.glob<{ default: any }>("./modules/**/*.ts", { eager: true });
const routeModuleList: RouteRecordRaw[] = loadRoutesFromModules(modules);

export const layoutRoutes = [...routeModuleList];

const layout = {
  path: "/layout",
  name: "Layout",
  component: LAYOUT,
  meta: {
    title: "Layout",
  },
  redirect: PageConstants.BASE_HOME,
  children: routeModuleList,
};

export default layout;
