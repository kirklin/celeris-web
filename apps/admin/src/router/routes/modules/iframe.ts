// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { CELERIS_WEB_GITHUB_URL } from "@celeris/constants";
import { IFRAME, LAYOUT } from "~/router/constant";

const iframe: RouteRecordRaw = {
  path: "/frame",
  name: "Frame",
  component: LAYOUT,
  redirect: "/frame/github",
  meta: {
    icon: "i-line-md-external-link",
    title: "外部页面",
  },
  children: [
    {
      path: "github",
      name: "GitHub",
      component: IFRAME,
      meta: {
        iframeLink: CELERIS_WEB_GITHUB_URL,
        icon: "i-line-md-github-loop",
        title: "GitHub仓库（内链）",
      },
    },
    {
      path: "github-external",
      name: "GitHubExternal",
      component: IFRAME,
      meta: {
        externalLink: CELERIS_WEB_GITHUB_URL,
        icon: "i-line-md-github-loop",
        title: "GitHub仓库（外链）",
      },
    },
  ],
};

export default iframe;
