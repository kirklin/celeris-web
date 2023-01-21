const dashboard = {
  path: "/dashboard",
  name: "Dashboard",
  component: () => import("~/views/dashboard/index.vue"),
  meta: {
    title: "Dashboard",
  },
};

export default dashboard;
