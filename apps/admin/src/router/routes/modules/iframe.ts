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
    title: "routes.iframe.iframe",
    icon: "i-line-md-external-link",
  },
  children: [
    {
      path: "github",
      name: "GitHub",
      component: IFRAME,
      meta: {
        title: "routes.iframe.githubInternal",
        icon: "i-line-md-github-loop",
        iframeLink: CELERIS_WEB_GITHUB_URL,
      },
    },
    {
      path: "github-external",
      name: "GitHubExternal",
      component: IFRAME,
      meta: {
        title: "routes.iframe.GitHubExternal",
        icon: "i-line-md-github-loop",
        externalLink: CELERIS_WEB_GITHUB_URL,
      },
    },
  ],
};

export default iframe;
