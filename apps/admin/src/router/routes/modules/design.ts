import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const design: RouteRecordRaw = {
  path: "/design",
  name: "Design",
  component: LAYOUT,
  redirect: "/design/palette",
  meta: {
    title: "routes.design.design",
    icon: "i-mdi-design",
  },
  children: [
    {
      path: "palette",
      name: "Palette",
      component: () => import("~/pages/design/palette/index.vue"),
      meta: {
        title: "routes.design.palette",
        icon: "i-mdi-palette",
      },
    },
    {
      path: "typography",
      name: "Typography",
      component: () => import("~/pages/design/typography/index.vue"),
      meta: {
        title: "routes.design.typography",
        icon: "tabler:typography",
      },
    },
  ],
};

export default design;
