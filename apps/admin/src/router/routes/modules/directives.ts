// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const directive: RouteRecordRaw = {
  path: "/directive",
  name: "Directives",
  component: LAYOUT,
  redirect: "/directive/copy",
  meta: {
    icon: "i-mingcute-plugin-2-line",
    title: "指令示例",
  },
  children: [
    {
      path: "copy",
      name: "Copy",
      component: () => import("~/pages/directives/copy/index.vue"),
      meta: {
        title: "Copy",
        icon: "i-material-symbols-content-copy-outline",
      },
    },
  ],
};

export default directive;
