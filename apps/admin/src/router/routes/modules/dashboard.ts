import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const dashboard: RouteRecordRaw = {
  path: "/dashboard",
  name: "Dashboard",
  component: LAYOUT,
  redirect: "/dashboard/index",
  meta: {
    title: "routes.dashboard.dashboard",
    icon: "i-mdi-monitor-dashboard",
    orderNumber: -9000,
    shouldHideSubMenuInMenu: true,
  },
  children: [
    {
      path: "index",
      name: "Dashboard",
      component: () => import("~/pages/dashboard/index.vue"),
      meta: {
        title: "routes.dashboard.dashboard",
        icon: "i-mdi-monitor-dashboard",
        shouldHideInMenu: true,
        shouldAffixToNavBar: true,
      },
    },
  ],
};

export default dashboard;
