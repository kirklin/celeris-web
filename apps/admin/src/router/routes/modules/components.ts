// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const components: RouteRecordRaw = {
  path: "/components",
  name: "Components",
  component: LAYOUT,
  redirect: "/components/headlessTable/basic",
  meta: {
    title: "routes.components.components",
    icon: "material-symbols:view-comfy-alt-outline-rounded",
    shouldHideSubMenuInMenu: false,
  },
  children: [
    {
      path: "headlessTable",
      name: "HeadlessTable",
      component: LAYOUT,
      redirect: "/components/headlessTable/basic",
      meta: {
        title: "routes.components.headlessTable",
        icon: "i-mdi-table",
        shouldHideInMenu: false,
      },
      children: [
        {
          path: "basic",
          name: "headlessTableBasic",
          component: () => import("~/pages/components/headless-table/basic/index.vue"),
          meta: {
            title: "routes.components.headlessTableBasic",
            shouldHideInMenu: false,
          },
        },
        {
          path: "pagination",
          name: "headlessTablePagination",
          component: () => import("~/pages/components/headless-table/pagination/index.vue"),
          meta: {
            title: "routes.components.headlessTablePagination",
            shouldHideInMenu: false,
          },
        },
      ],
    },
  ],
};

export default components;
