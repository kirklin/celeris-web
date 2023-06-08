import type { RouteRecordRaw } from "vue-router";
import { IFRAME, LAYOUT } from "~/router/constant";

const iframe: RouteRecordRaw = {
  path: "/frame",
  name: "Frame",
  component: LAYOUT,
  redirect: "/frame/github",
  meta: {
    icon: "ion:tv-outline",
    title: "外部页面",
  },
  children: [
    {
      path: "github",
      name: "GitHub",
      component: IFRAME,
      meta: {
        frameSrc: "https://github.com/kirklin/celeris-web",
        title: "GitHub仓库（内链）",
      },
    },
    {
      path: "https://github.com/kirklin/celeris-web",
      name: "GitHubExternal",
      component: IFRAME,
      meta: {
        title: "GitHub仓库（外链）",
      },
    },
  ],
};

export default iframe;
