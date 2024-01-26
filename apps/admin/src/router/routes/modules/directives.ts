// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const directive: RouteRecordRaw = {
  path: "/directive",
  name: "Directives",
  component: LAYOUT,
  redirect: "/directive/copy",
  meta: {
    title: "routes.directives.directives",
    icon: "i-mingcute-plugin-2-line",
  },
  children: [
    {
      path: "ripple",
      name: "Ripple",
      component: () => import("~/pages/directives/ripple/index.vue"),
      meta: {
        title: "routes.directives.ripple",
        icon: "material-symbols:ripples",
      },
    },
    {
      path: "copy",
      name: "Copy",
      component: () => import("~/pages/directives/copy/index.vue"),
      meta: {
        title: "routes.directives.copy",
        icon: "material-symbols:content-copy-outline",
      },
    },
  ],
};

export default directive;
