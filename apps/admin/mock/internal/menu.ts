import type { RequestParams } from "@celeris/utils";
import { createErrorResponse, createSuccessResponse, extractAuthorizationToken } from "@celeris/utils";
import type { MockMethod } from "vite-plugin-mock";
import type { RouteMeta } from "vue-router";
import { getFakeUserByToken } from "./auth";

export interface RouteItem {
  path: string;
  component: any;
  meta: RouteMeta;
  name?: string;
  alias?: string | string[];
  redirect?: string;
  children?: RouteItem[];
}

const dashboardRoute: RouteItem = {
  path: "/dashboard",
  name: "Dashboard",
  component: "LAYOUT",
  redirect: "/dashboard/index",
  meta: {
    shouldHideSubMenuInMenu: true,
    icon: "i-mdi-monitor-dashboard",
    title: "Dashboard",
  },
  children: [
    {
      path: "index",
      name: "Dashboard",
      component: "/dashboard/index",
      meta: {
        title: "Dashboard",
        icon: "i-mdi-monitor-dashboard",
        currentActiveMenu: "/dashboard",
        shouldHideInMenu: true,
      },
    },
  ],
};

const mockMethods: MockMethod[] = [
  {
    url: "/api/menu/list",
    method: "get",
    response: (request: RequestParams) => {
      try {
        const authorizationToken = extractAuthorizationToken(request);
        const fakeUserInfo = getFakeUserByToken(authorizationToken);
        const { id } = fakeUserInfo;
        let menus;
        switch (id) {
          case "1":
            menus = [dashboardRoute];
            break;
          case "2":
            menus = [dashboardRoute];
            break;
          default:
            menus = [];
        }
        return createSuccessResponse(menus);
      } catch (error) {
        return createErrorResponse(error instanceof Error ? error.message : String(error));
      }
    },
  },
];

export default mockMethods;
