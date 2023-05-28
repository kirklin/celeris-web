import type { RouteItem } from "../../models/menu/RouteItem";

export const dashboardRoute: RouteItem = {
  path: "/dashboard",
  name: "Dashboard",
  component: "LAYOUT",
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
      component: "/dashboard/index",
      meta: {
        title: "Dashboard",
        icon: "i-mdi-monitor-dashboard",
        currentActiveMenu: "/dashboard",
        shouldHideInMenu: true,
      },
    },
  ],
};
