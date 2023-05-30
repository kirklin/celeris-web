import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const dashboard: RouteRecordRaw = {
  path: "/dashboard",
  name: "Dashboard",
  component: LAYOUT,
  redirect: "/dashboard/index",
  meta: {
    shouldHideSubMenuInMenu: true,
    icon: "i-mdi-monitor-dashboard",
    title: "Dashboard",
  },
  children: [
    {
      path: "index",
      name: "Dashboard",
      component: () => import("~/pages/dashboard/index.vue"),
      meta: {
        title: "Dashboard",
        icon: "i-mdi-monitor-dashboard",
        shouldHideInMenu: true,
      },
    },
  ],
};

export default dashboard;
