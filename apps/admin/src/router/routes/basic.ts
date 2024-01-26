import type { RouteRecordRaw } from "vue-router";
import {
  EXCEPTION_COMPONENT,
  LAYOUT,
  PAGE_NOT_FOUND_NAME,
  REDIRECT_NAME,
} from "~/router/constant";

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: "ErrorPage",
    shouldHideInMenu: true,
    shouldHideBreadcrumb: true,
  },
  children: [
    {
      path: "/:path(.*)*",
      name: PAGE_NOT_FOUND_NAME,
      component: EXCEPTION_COMPONENT,
      meta: {
        title: "ErrorPage",
        shouldHideInMenu: true,
        shouldHideBreadcrumb: true,
      },
    },
  ],
};
export const REDIRECT_ROUTE: RouteRecordRaw = {
  path: "/redirect",
  component: LAYOUT,
  name: "RedirectTo",
  meta: {
    title: REDIRECT_NAME,
    shouldHideBreadcrumb: true,
    shouldHideInMenu: true,
  },
  children: [
    {
      path: "/redirect/:path(.*)",
      name: REDIRECT_NAME,
      component: () => import("~/pages/internal/redirect/index.vue"),
      meta: {
        title: REDIRECT_NAME,
        shouldHideBreadcrumb: true,
      },
    },
  ],
};
