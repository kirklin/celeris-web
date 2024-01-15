import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const profile: RouteRecordRaw = {
  path: "/profile",
  name: "Profile",
  component: LAYOUT,
  redirect: "/profile/index",
  meta: {
    title: "routes.profile.profile",
    icon: "tabler:user-square-rounded",
    orderNumber: -9000,
    shouldHideSubMenuInMenu: true,
    shouldHideInMenu: true,
  },
  children: [
    {
      path: "index",
      name: "Profile",
      component: () => import("~/pages/profile/index.vue"),
      meta: {
        title: "routes.profile.profile",
        icon: "tabler:user-square-rounded",
        shouldHideInMenu: true,
      },
    },
  ],
};

export default profile;
