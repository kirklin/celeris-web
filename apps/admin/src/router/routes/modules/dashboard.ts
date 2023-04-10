import type { RouteRecordRaw } from "vue-router";

const dashboard: RouteRecordRaw = {
  path: "/dashboard",
  name: "Dashboard",
  component: () => import("~/views/dashboard/index.vue"),
  meta: {
    title: "Dashboard",
  },
};

export default dashboard;
