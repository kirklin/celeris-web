// @unocss-include
import type { RouteRecordRaw } from "vue-router";
import { LAYOUT } from "~/router/constant";

const chat: RouteRecordRaw = {
  path: "/chat",
  name: "Chat",
  component: LAYOUT,
  redirect: "/chat/index",
  meta: {
    title: "routes.chat.chat",
    icon: "i-tabler:message-chatbot",
    orderNumber: -9999,
    shouldHideSubMenuInMenu: true,
  },
  children: [
    {
      path: "index",
      name: "Chat",
      component: () => import("~/pages/chat/index.vue"),
      meta: {
        title: "routes.chat.chat",
        icon: "i-tabler:message-chatbot",
        shouldHideInMenu: true,
      },
    },
  ],
};

export default chat;
