// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const components: RouteRecordRaw = {
  path: "/components",
  name: "Components",
  component: LAYOUT,
  redirect: "/components/index",
  meta: {
    title: "routes.components.components",
    icon: "i-radix-icons-component-1",
    shouldHideSubMenuInMenu: false,
  },
  children: [
    {
      path: "headlessTable",
      name: "HeadlessTable",
      component: LAYOUT,
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
      ],
    },
  ],
};

export default components;
