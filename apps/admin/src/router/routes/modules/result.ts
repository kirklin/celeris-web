// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const result: RouteRecordRaw = {
  path: "/result",
  name: "Result",
  component: LAYOUT,
  redirect: "/result/success",
  meta: {
    title: "routes.result.result",
    icon: "i-mdi-check-circle",
  },
  children: [
    {
      path: "success",
      name: "ResultSuccess",
      component: () => import("~/pages/result/success.vue"),
      meta: {
        title: "routes.result.success",
        icon: "i-mdi-check-circle",
      },
    },
    {
      path: "fail",
      name: "ResultFail",
      component: () => import("~/pages/result/fail.vue"),
      meta: {
        title: "routes.result.fail",
        icon: "i-mdi-close-circle",
      },
    },
  ],
};

export default result;
