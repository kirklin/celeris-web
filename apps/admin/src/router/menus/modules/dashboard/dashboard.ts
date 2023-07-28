// @unocss-include
import type { MenuModule } from "@celeris/types";

const dashboard: MenuModule = {
  orderNumber: 1,
  menu: {
    path: "/dashboard",
    name: "Dashboard",
    icon: "i-mdi-monitor-dashboard",
    meta: {
      title: "routes.dashboard.dashboard",
      icon: "i-mdi-monitor-dashboard",
    },
  },
};

export default dashboard;
