import type { RouteRecordRaw } from "vue-router";
import {
  LAYOUT,
  PAGE_NOT_FOUND_NAME,
} from "~/router/constant";

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: RouteRecordRaw = {
  path: "/:path(.*)*",
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: "ErrorPage",
  },
};
